
import Web3 from 'web3';

import TruffleConfig from "../config/truffle-config.js";
import ERC1155Token from "../contracts/ERC1155Token.json";
import ERC1155TokenFactory from "../contracts/ERC1155TokenFactory.json";

import { isNonZeroAddress } from '../utils/web3.js';

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

export const initWeb3 = () => {
    const web3 = new Web3(Web3.givenProvider || TruffleConfig.goerli_infura.provider());
    const networkID = TruffleConfig.networks.goerli_infura.network_id;
    const contract = initERC1155TokenFactory(web3, networkID);

    return { web3, networkID, contract };
}

export const fetchERC1155TokenIfNotExist = async (web3, eth, collectionName) => {
    for (const contract of eth.contracts) {
        const keys = Object.keys(contract);

        if (keys[0] === collectionName) {
            return { result: true, contract: contract };
        }
    }

    return await initERC1155Token(web3, eth.contracts[0], collectionName);
}