import Web3 from "web3";
import TruffleConfig from "../config/truffle-config.js";
import TruffleEnv from "../config/truffle-env.js";
import ERC1155Token from "../contracts/ERC1155Token.json";
import ERC1155TokenFactory from "../contracts/ERC1155TokenFactory.json";

import { isNonZeroAddress } from "../utils/web3.js";
import { CollectionNameEnum } from "./enum/collection_name_enum.js";
import { getObjectFromS3 } from "./bucket.js";
import assert from "assert";

const initERC1155TokenFactory = (web3, networkId) => {
  const artifact = ERC1155TokenFactory;
  const { abi } = artifact;
  const contract = {
    ERC1155TokenFactory: new web3.eth.Contract(
      abi,
      artifact.networks[networkId].address
    ),
  };

  return contract;
};

const initERC1155Token = async (
  web3,
  ERC1155TokenFactoryContract,
  collectionName
) => {
  const { abi } = ERC1155Token;
  const ERC1155TokenAddress = await ERC1155TokenFactoryContract.methods
    .getContractAddressByName(collectionName)
    .call();

  if (!isNonZeroAddress(ERC1155TokenAddress)) {
    return {
      result: false,
      message: `"The contract having ${collectionName} *not* exists`,
    };
  }

  const contract = new web3.eth.Contract(abi, ERC1155TokenAddress);

  return { result: true, contract: contract };
};

const isExistERC1155TokenByCollectionName = (eth, collectionName) => {
  let ERC1155TokenContract;

  for (const contract of eth.contracts) {
    const keys = Object.keys(contract);

    if (keys[0] === collectionName) {
      ERC1155TokenContract = contract[collectionName];

      return ERC1155TokenContract;
    }
  }

  if (ERC1155TokenContract === undefined) {
    return;
  }
};

export const checkMetaMaskInstalled = () => {
  if (window.ethereum && window.ethereum.isMetaMask) {
    return true;
  } else {
    return false;
  }
};

// 6f1984f65cb64e4a2dba921e75cf31cde1c84f1039ad9320ebe73447e39f7ab2
export const initWeb3 = async () => {
  return new Promise(async (resolve, reject) => {
    if (!checkMetaMaskInstalled()) {
      reject(new Error("MetaMask isn't installed"));
      return;
    }

    const web3 = new Web3(
      window.ethereum || TruffleConfig.networks.goerli_infura.provider
    );
    const accounts = await web3.eth.requestAccounts();
    const networkID = TruffleConfig.networks.goerli_infura.network_id;
    const ERC1155TokenFactoryContractObject = initERC1155TokenFactory(
      web3,
      networkID
    );
    const collectionEnumList = Object.values(CollectionNameEnum);

    let contracts = [
      {
        ERC1155TokenFactory:
          ERC1155TokenFactoryContractObject.ERC1155TokenFactory,
      },
    ];

    for (const collectionEnum of collectionEnumList) {
      const result = await initERC1155Token(
        web3,
        ERC1155TokenFactoryContractObject.ERC1155TokenFactory,
        collectionEnum.name
      );

      contracts.push({ [collectionEnum.name]: result.contract });
    }

    resolve({ web3, accounts, networkID, contracts });
  });
};

const subscribeTransactionStatus = (eth, transactionHash) => {
  return new Promise(async (resolve, reject) => {
    var interval = setInterval(async () => {
      let statusOfTransaction = null;

      await eth.web3.eth
        .getTransactionReceipt(transactionHash)
        .then((receipt) => {
          if (receipt === null) {
            return;
          }

          console.log("statusOfTransaction", receipt);

          statusOfTransaction = receipt.status;
        });

      if (statusOfTransaction === null) {
        return;
      }

      if (statusOfTransaction) {
        clearInterval(interval);
        resolve(true);

        return;
      }
      clearInterval(interval);
      resolve(false);

      return;
    }, 2000);
  });
};

export const fetchERC1155TokenIfNotExist = async (
  web3,
  eth,
  collectionName
) => {
  for (const contract of eth.contracts) {
    const keys = Object.keys(contract);

    if (keys[0] === collectionName) {
      return { result: true, contract: contract };
    }
  }

  const ERC1155TokenFactoryContract = Object.values(eth.contracts[0])[0];
  const result = await initERC1155Token(
    web3,
    ERC1155TokenFactoryContract,
    collectionName
  );

  return result;
};

export const getUserCoinBalance = async (eth) => {
  const coinBalance = await eth.web3.eth.getBalance(eth.accounts[0]);

  return eth.web3.utils.fromWei(coinBalance, "ether");
};

export const getUserTokenBalanceByCollectionName = async (
  eth,
  collectionName
) => {
  const ERC1155TokenContract = isExistERC1155TokenByCollectionName(
    eth,
    collectionName
  );

  if (ERC1155TokenContract === undefined) {
    return;
  }

  const balance = await ERC1155TokenContract.methods
    .balanceOf(eth.accounts[0], 1)
    .call();

  return balance;
};

export const getTokenBalance = async (eth) => {
  const ERC1155TokenContract = isExistERC1155TokenByCollectionName(
    eth,
    CollectionNameEnum.LYCLE_TOKEN.name
  );

  if (ERC1155TokenContract === undefined) {
    return;
  }

  const balance = await ERC1155TokenContract.methods
    .balanceOf(eth.accounts[0], 1)
    .call();

  return balance;
};

export const getTokenImageUri = async (eth) => {
  const ERC1155TokenContract = isExistERC1155TokenByCollectionName(
    eth,
    CollectionNameEnum.LYCLE_TOKEN.name
  );

  if (ERC1155TokenContract === undefined) {
    return;
  }

  const tokenUri = await ERC1155TokenContract.methods.uri(1).call();
  const tokenJson = JSON.parse(await getObjectFromS3(tokenUri));

  return tokenJson.image;
};

// TODO: import blockchain
export const getNftListByWalletAddress = async (eth) => {
  let mapNftJsonToCollectionName = [];

  for (const contractMap of eth.contracts) {
    if (contractMap === eth.contracts[0] || contractMap === eth.contracts[1]) {
      continue;
    }

    const collectionName = Object.keys(contractMap)[0];
    const ERC1155TokenContract = Object.values(contractMap)[0];
    const holdedTokenIds = await ERC1155TokenContract.methods
      .holdedTokenIds(eth.accounts[0])
      .call();
    let nftJsons = [];

    for (const holdedTokenId of holdedTokenIds) {
      const nftUri = await ERC1155TokenContract.methods
        .uri(holdedTokenId)
        .call();
      nftJsons.push(JSON.parse(await getObjectFromS3(nftUri)));
    }

    mapNftJsonToCollectionName.push(nftJsons);
  }

  return mapNftJsonToCollectionName;
};

// TODO: import blockchain
export const getRegistedNftList = async (eth) => {
  // dummy data
  const nftUris = [
    "0x89952cfB009c886b86607DF526B7dc32937C8BE5/nfts/json/1.json",
    "0x89952cfB009c886b86607DF526B7dc32937C8BE5/nfts/json/2.json",
    "0x89952cfB009c886b86607DF526B7dc32937C8BE5/nfts/json/3.json",
    "0x89952cfB009c886b86607DF526B7dc32937C8BE5/nfts/json/4.json",
    "0x89952cfB009c886b86607DF526B7dc32937C8BE5/nfts/json/5.json",
    "0x89952cfB009c886b86607DF526B7dc32937C8BE5/nfts/json/6.json",
    "0x89952cfB009c886b86607DF526B7dc32937C8BE5/nfts/json/7.json",
    "0x89952cfB009c886b86607DF526B7dc32937C8BE5/nfts/json/8.json",
    "0x89952cfB009c886b86607DF526B7dc32937C8BE5/nfts/json/9.json",
    "0x89952cfB009c886b86607DF526B7dc32937C8BE5/nfts/json/10.json",
  ];

  let result = [];

  for (const nftUri of nftUris) {
    const nftJson = JSON.parse(await getObjectFromS3(nftUri));
    result.push(nftJson);
  }

  return result;
};

/**
 * @author Jang Seongho
 *
 * @constant
 * @type { function }
 *
 * @description
 * NFT를 구매하는 함수입니다. 성공적으로 구매하면 true, 실패하면 false가 반환됩니다.
 * 이더리움 네트워크 특성 상, 거래 처리에 10 ~ 20초 걸립니다.
 *
 * @param { eth } eth - recoil에 있는 ethState를 넣어주시면 됩니다.
 * @param { String } collectionName
 * 컬렉션 이름을 넣어주면 됩니다. datas/enum/collection_name_enum.js에 선언되어 있는 CollectionNameEnum 객체를 사용하시면 됩니다.
 * @param { String } nftId - 문자열로 nft id를 입력해주시면 됩니다.
 * @param { String } owner - 문자열로 NFT 소유자의 지갑 주소를 입력해주시면 됩니다.
 * @param { String } price - 문자열로 NFT 가격을 입력해주시면 됩니다.
 * @returns { boolean }
 * true - 거래 성공
 * false - 거래 실패
 *
 * @example
 * ```js
 * const { ethState, setEthState } = useEth();
 *
 * buyNft(ethState, CollectionNameEnum.LACK_OF_SLEEP_LAMA, "1", "0xqweqasdz1231212", "100").then((result) => {
 *      if(result) {
 *          // 거래 성공시 처리 로직
 *
 *          return;
 *      }
 *
 *      // 거래 실패시 처리 로직
 * });
 * ```
 *
 * @throws { Error } 잔고가 부족하다던가, NFT가 없다던가 등의 이유로 거래 시도 자체가 거절된 경우
 */
export const buyNft = async (eth, collectionName, nftId, owner, price) => {
  return new Promise(async (resolve, reject) => {
    const ERC1155TokenContract = isExistERC1155TokenByCollectionName(
      eth,
      collectionName
    );

    if (ERC1155TokenContract === undefined) {
      reject(new Error(`Not exist nft, collection name is ${collectionName}`));

      return;
    }

    const balanceOfNft = await ERC1155TokenContract.methods
      .balanceOf(owner, nftId)
      .call();

    assert(balanceOfNft > 0, "The balance of nft is 0");

    let transactionOfEther = null;
    let transactionOfNft = null;

    try {
      transactionOfEther = await eth.web3.eth.sendTransaction({
        from: eth.accounts[0],
        to: owner,
        value: price,
      });
    } catch (e) {
      reject(
        new Error(`Can't send Ether from ${eth.accounts[0]} to ${owner}.`)
      );
    }

    const ERC1155ItemJsonBytes = await ERC1155TokenContract.methods
      .uri(nftId)
      .call();

    try {
      transactionOfNft = await ERC1155TokenContract.methods
        .safeTransferFrom(
          owner,
          eth.accounts[0],
          nftId,
          1,
          ERC1155ItemJsonBytes
        )
        .send({ from: TruffleEnv.DEPLOYER_ACCOUNT });
    } catch (e) {
      reject(new Error(`Can't send NFT from ${owner} to ${eth.accounts[0]}.`));
    }

    let statusTransactionOfEther = await subscribeTransactionStatus(
      transactionOfEther.transactionHash
    );
    let statusTransactionOfNft = await subscribeTransactionStatus(
      transactionOfNft.transactionHash
    );

    console.log(statusTransactionOfEther, statusTransactionOfNft);

    if (statusTransactionOfEther && statusTransactionOfNft) {
      return true;
    }

    return false;
  });
};

/**
 * @author Jang Seongho
 *
 * @constant
 * @type { function }
 *
 * @description
 * Lycle 토큰을 소비하는 함수입니다. 성공적으로 소비하면 true, 실패하면 false가 반환됩니다.
 * 이더리움 네트워크 특성 상, 거래 처리에 10 ~ 20초 걸립니다.
 *
 * @param { eth } eth - recoil에 있는 ethState를 넣어주시면 됩니다.
 * @param { String } amount - 소비하고자 하는 Lycle 토큰의 개수를 문자열로 입력해주시면 됩니다.
 *
 * true - 소비 성공
 * false - 소비 실패
 *
 * @example
 * ```js
 * const { ethState, setEthState } = useEth();
 *
 * payLycleToken(ethState, "100").then((result) => {
 *      if(result) {
 *          // 거래 성공시 처리 로직
 *
 *          return;
 *      }
 *
 *      // 거래 실패시 처리 로직
 * });
 * ```
 *
 * @throws { Error } 잔고가 부족하다던가, NFT가 없다던가 등의 이유로 거래 시도 자체가 거절된 경우
 */
export const payLycleToken = async (eth, amount) => {
  return new Promise(async (resolve, reject) => {
    const LycleTokenContract = isExistERC1155TokenByCollectionName(
      eth,
      CollectionNameEnum.LYCLE_TOKEN.name
    );
    if (LycleTokenContract === undefined) {
      reject(new Error(`Not exist`));
      return;
    }
    const balanceOfToken = await LycleTokenContract.methods
      .balanceOf(eth.accounts[0], "1")
      .call();
    assert(balanceOfToken > 0, "The balance of token is 0");
    let transactionOfBalance = null;
    try {
      transactionOfBalance = await LycleTokenContract.methods
        .safeTransferFrom(
          eth.accounts[0],
          "0x8dd37C53AA1abF62251d786CBb23796E3cAbfa38",
          "1",
          amount,
          "0x0"
        )
        .send({ from: eth.accounts[0] });
    } catch (e) {
      reject(
        new Error(
          `Can’t send NFT from ${eth.accounts[0]} to ${eth.accounts[0]}.`
        )
      );
    }
    let statusTransactionOfToken = await subscribeTransactionStatus(
      eth,
      transactionOfBalance.transactionHash
    );
    if (statusTransactionOfToken) {
      resolve(true);
      return;
    }
    resolve(false);
  });
};
export const mint = async (eth) => {
  let ERC1155TokenContract;
  let LycleTokenContract;
  for (const contract of eth.contracts) {
    const keys = Object.keys(contract);

    if (keys[0] === CollectionNameEnum.LACK_OF_SLEEP_LAMA.name) {
      ERC1155TokenContract =
        contract[CollectionNameEnum.LACK_OF_SLEEP_LAMA.name];
    }

    if (keys[0] === CollectionNameEnum.LYCLE_TOKEN.name) {
      LycleTokenContract = contract[CollectionNameEnum.LYCLE_TOKEN.name];
    }
  }

  const LycleTokenJsonPath =
    "/0x607d831c41b49dF8Fc99c72d67487C14629A8CC2/tokens/json/1.json";
  const LycleTokenJsonBytes = eth.web3.utils.asciiToHex(LycleTokenJsonPath);

  LycleTokenContract.methods
    .mint(
      "0x3f54fDA5DfF0713630E4bEe225591Cdb5f6B4CaE",
      "1",
      "100",
      LycleTokenJsonBytes
    )
    .send({ from: "0x8dd37C53AA1abF62251d786CBb23796E3cAbfa38" });

  const ERC1155ItemJsonPath = `/0x89952cfB009c886b86607DF526B7dc32937C8BE5/nfts/json/1.json`;
  const ERC1155ItemJsonBytes = eth.web3.utils.asciiToHex(ERC1155ItemJsonPath);

  ERC1155TokenContract.methods
    .mint(
      "0x3f54fDA5DfF0713630E4bEe225591Cdb5f6B4CaE",
      "1",
      "1",
      ERC1155ItemJsonBytes
    )
    .send({ from: "0x8dd37C53AA1abF62251d786CBb23796E3cAbfa38" });

  const ERC1155Item2JsonPath = `/0x89952cfB009c886b86607DF526B7dc32937C8BE5/nfts/json/1.json`;
  const ERC1155Item2JsonBytes = eth.web3.utils.asciiToHex(ERC1155Item2JsonPath);

  ERC1155TokenContract.methods
    .mint(
      "0x3f54fDA5DfF0713630E4bEe225591Cdb5f6B4CaE",
      "2",
      "1",
      ERC1155Item2JsonBytes
    )
    .send({ from: "0x8dd37C53AA1abF62251d786CBb23796E3cAbfa38" });

  const ERC1155Item3JsonPath = `/0x89952cfB009c886b86607DF526B7dc32937C8BE5/nfts/json/1.json`;
  const ERC1155Item3JsonBytes = eth.web3.utils.asciiToHex(ERC1155Item3JsonPath);

  ERC1155TokenContract.methods
    .mint(
      "0x3f54fDA5DfF0713630E4bEe225591Cdb5f6B4CaE",
      "3",
      "1",
      ERC1155Item3JsonBytes
    )
    .send({ from: "0x8dd37C53AA1abF62251d786CBb23796E3cAbfa38" });
};

export const burn = async (eth) => {
  let ERC1155TokenContract;
  for (const contract of eth.contracts) {
    const keys = Object.keys(contract);

    if (keys[0] === CollectionNameEnum.LACK_OF_SLEEP_LAMA.name) {
      ERC1155TokenContract =
        contract[CollectionNameEnum.LACK_OF_SLEEP_LAMA.name];
    }
  }

  await ERC1155TokenContract.methods
    .burn("0x8dd37C53AA1abF62251d786CBb23796E3cAbfa38", "3", "1")
    .send({ from: "0x8dd37C53AA1abF62251d786CBb23796E3cAbfa38" });
  await ERC1155TokenContract.methods
    .burn("0x8dd37C53AA1abF62251d786CBb23796E3cAbfa38", "2", "1")
    .send({ from: "0x8dd37C53AA1abF62251d786CBb23796E3cAbfa38" });
  await ERC1155TokenContract.methods
    .burn("0x8dd37C53AA1abF62251d786CBb23796E3cAbfa38", "1", "1")
    .send({ from: "0x8dd37C53AA1abF62251d786CBb23796E3cAbfa38" });
};
