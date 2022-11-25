import React, { useCallback, useEffect, useState } from "react";
import "./AddNft.css";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import axios from "axios";
import {
  checkMetaMaskInstalled,
  getNftListByWalletAddress,
  initWeb3,
  initERC1155Token,
} from "../datas/contract.js";
import { walletState } from "../recoil/Wallet.js";
import useEth from "../contexts/EthContext/useEth.js";
import { CollectionNameEnum } from "../datas/enum/collection_name_enum.js";

//import { Info } from "@material-ui/icons";

function TestNftImgList() {
  const [nftList, setNftList] = useState([]);
  const { eth, setEthState } = useEth();

  useEffect(() => {
    getAddress();
  }, [eth]);

  const getAddress = async () => {
    const result = await getNftListByWalletAddress(eth);
    setNftList(result);
  };

  return (
    <div>
      {nftList.map((nft) => {
        switch (nftList.indexOf(nft)) {
          case CollectionNameEnum.LACK_OF_SLEEP_LAMA.index:
            let imgList = [];

            for (const lslNft of nft) {
              imgList.push(
                <div>
                  <img src={lslNft.image} />
                  <p>{lslNft.name}</p>
                  <p>{lslNft.description}</p>
                  <div>
                    {lslNft.attributes.map((attribute) => {
                      return (
                        <div>
                          <p>
                            {attribute.trait_type}: {attribute.value}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            }
            return imgList;
          default:
            break;
        }
      })}
    </div>
  );
}

export default TestNftImgList;
