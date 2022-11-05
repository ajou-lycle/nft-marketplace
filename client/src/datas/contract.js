
import Web3 from 'web3';

import TruffleConfig from "../config/truffle-config.js";
import TruffleEnv from "../config/truffle-env.js";
import ERC1155Token from "../contracts/ERC1155Token.json";
import ERC1155TokenFactory from "../contracts/ERC1155TokenFactory.json";

import { isNonZeroAddress } from '../utils/web3.js';
import { CollectionNameEnum } from './collection_name_enum.js';
import { getObjectFromS3 } from './bucket.js';

const initERC1155TokenFactory = (web3, networkId) => {
    const artifact = ERC1155TokenFactory;
    const { abi } = artifact;
    const contract = {
        ERC1155TokenFactory: new web3.eth.Contract(abi, artifact.networks[networkId].address)
    };

    return contract;
}

const initERC1155Token = async (web3, ERC1155TokenFactoryContract, collectionName) => {
    const { abi } = ERC1155Token;
    const ERC1155TokenAddress = await ERC1155TokenFactoryContract.methods.getContractAddressByName(collectionName).call();

    if (!isNonZeroAddress(ERC1155TokenAddress)) {
        return { result: false, message: `"The contract having ${collectionName} *not* exists` };
    }

    const contract = new web3.eth.Contract(abi, ERC1155TokenAddress);

    return { result: true, contract: contract };
}

const isExistERC1155TokenByCollectionName = (eth, collectionName) => {
    let ERC1155TokenContract;

    for (const contract of eth.contracts) {
        const keys = Object.keys(contract);

        if (keys[0] === collectionName) {
            ERC1155TokenContract = contract[collectionName];

            return ERC1155TokenContract;
        }
    }

    if(ERC1155TokenContract === undefined) {
        return;
    }
}
export const initWeb3 = async () => {
    const web3 = new Web3(Web3.givenProvider || TruffleConfig.goerli_infura.provider());
    const accounts = await web3.eth.requestAccounts();
    const networkID = TruffleConfig.networks.goerli_infura.network_id;
    const ERC1155TokenFactoryContractObject = initERC1155TokenFactory(web3, networkID);
    const collectionNameList = Object.values(CollectionNameEnum);

    let contracts = [ERC1155TokenFactoryContractObject.ERC1155TokenFactory];

    for (const collectionName of collectionNameList) {
        const result = await initERC1155Token(web3, ERC1155TokenFactoryContractObject.ERC1155TokenFactory, collectionName);

        contracts.push({ [collectionName]: result.contract });
    }

    return { web3, accounts, networkID, contracts };
}

export const fetchERC1155TokenIfNotExist = async (web3, eth, collectionName) => {
    for (const contract of eth.contracts) {
        const keys = Object.keys(contract);

        if (keys[0] === collectionName) {
            return { result: true, contract: contract };
        }
    }

    const ERC1155TokenFactoryContract = Object.values(eth.contracts[0])[0];
    const result = await initERC1155Token(web3, ERC1155TokenFactoryContract, collectionName);

    return result;
}

export const getUserCoinBalance = async (eth) => {
    const coinBalance = await eth.web3.eth.getBalance(eth.accounts[0]);
    
    return eth.web3.utils.fromWei(coinBalance, "ether");
}

export const getUserTokenBalanceByCollectionName = async (eth, collectionName) => {
    const ERC1155TokenContract = isExistERC1155TokenByCollectionName(eth, collectionName);

    if(ERC1155TokenContract === undefined) {
        return;
    }

    const balance = await ERC1155TokenContract.methods.balanceOf(eth.accounts[0], 1).call();

    return balance;
}

export const getTokenBalance = async (eth) => {
    const ERC1155TokenContract = isExistERC1155TokenByCollectionName(eth, CollectionNameEnum.LYCLE_TOKEN);

    if(ERC1155TokenContract === undefined) {
        return;
    }

    const balance = await ERC1155TokenContract.methods.balanceOf(eth.accounts[0], 0).call();

    return balance;
}

export const getTokenImageUri = async (eth) => {
    const ERC1155TokenContract = isExistERC1155TokenByCollectionName(eth, CollectionNameEnum.LYCLE_TOKEN);

    if(ERC1155TokenContract === undefined) {
        return;
    }

    const tokenUri = await ERC1155TokenContract.methods.uri(0).call();
    const tokenJson = JSON.parse(await getObjectFromS3(tokenUri));
    
    return tokenJson.image;
}

export const mint = async (eth) => {
    let LycleTokenContract;
    for (const contract of eth.contracts) {
        const keys = Object.keys(contract);

        if (keys[0] === CollectionNameEnum.LYCLE_TOKEN) {
            LycleTokenContract = contract[CollectionNameEnum.LYCLE_TOKEN];
        }
    }

    const ERC1155ItemJsonPath = `0x6E321633A2fDd93a48f08d7271088C837cCd2697/tokens/json/1.json`;
    const ERC1155ItemJsonBytes = eth.web3.utils.asciiToHex(ERC1155ItemJsonPath);

    const result = await LycleTokenContract.methods.mint("0x8dd37C53AA1abF62251d786CBb23796E3cAbfa38", "0", "100", ERC1155ItemJsonBytes).send({from: TruffleEnv.DEPLOYER_ACCOUNT});
}