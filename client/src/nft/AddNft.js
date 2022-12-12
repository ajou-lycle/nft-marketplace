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
import { Link } from "react-router-dom";

//import { Info } from "@material-ui/icons";

function AddNft() {
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [nftCollection, setNftList] = useState([]);
  const { eth, setEthState } = useEth();
  const [nftitemImg, setnftitemImg] = useState("");
  const [nfttitle, setnftTitle] = useState("");
  const [nftprice, setnftPrice] = useState(0);
  const [nftcontent, setnftContent] = useState("");
  const [nftEdition, setnftEdition] = useState(0);
  // const [grade,setGrade] =useState('');

  const onClickAddNft = () => {
    if (nftprice == "" || nfttitle == "" || nftcontent == "") {
      alert("정보를 모두 입력해주세요!");
    } else {
      axios
        .post(
          "http://3.38.210.200:8080/nftItem",
          {
            // userData
            nftItemImg: nftitemImg,
            title: nfttitle,
            price: nftprice,
            content: nftcontent,
            nftId: nftEdition,
            collectionName: CollectionNameEnum.LACK_OF_SLEEP_LAMA.name,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem("user_token")}`,
            },
          }
        )
        .then((res) => {
          console.log("res.data", res.data);
          alert("등록이 완료되었습니다!");
          document.location.href = "/mainPage";
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  };

  useEffect(() => {
    getAddress();
  }, [eth]);

  //initWeb3();
  const getAddress = async () => {
    const result = await getNftListByWalletAddress(eth);
    setNftList(result);
    console.log(
      result[CollectionNameEnum.LACK_OF_SLEEP_LAMA.index][0],
      "소유nft"
    );
  };

  const getData = () => {
    if (nftCollection.length === 0) {
      return <p style={{ display: "inline" }}></p>;
    }

    return (
      <p>
        {nftCollection[CollectionNameEnum.LACK_OF_SLEEP_LAMA.index][0].name}
      </p>
    );
  };

  const getNftInfo = () => {
    setnftTitle();
  };

  const preventMinus = (e) => {
    if (e.code === "Minus") {
      e.preventDefault();
    }
  }; //price 입력값 음수 press 막기

  const preventPasteNegative = (e) => {
    const clipboardData = e.clipboardData || window.clipboardData;
    const pastedData = parseFloat(clipboardData.getData("text"));

    if (pastedData < 0) {
      e.preventDefault();
    }
  }; //price 입력값 음수 paste 막기

  return (
    <div className="whole_nft_add">
      <div className="whole_center_nft_add">
        <div className="nft_add_form">
          <div className="nft_add_form_disc">
            <div className="nft_add_form_disc_1">
              <div className="nft_add_form_disc_1_2">
                <div className="addnft_title">
                  <div className="addnft_title_text"> NFT 등록 </div>
                </div>
              </div>
            </div>
            <div className="add_things">
              <dl className="add_name">
                <dt className="d_left">NFT TITLE</dt>
                <div className="d_right">{nfttitle}</div>
              </dl>
              <dl className="add_image">
                <dt className="d_left">NFT CONTENT</dt>
                <div className="d_disc">{nftcontent}</div>
              </dl>
              <dl className="add_content">
                <dt className="d_left">NFT PRICE</dt>
                <dd>
                  <NftAddLeft
                    type="number"
                    id="nftprice"
                    placeholder="Enter NFT price"
                    value={nftprice}
                    min="1"
                    onChange={(e) => setnftPrice(e.target.value)}
                    onPaste={preventPasteNegative}
                    onKeyPress={preventMinus}
                  ></NftAddLeft>
                </dd>
              </dl>
            </div>

            <div className="nft_add_button">
              <Link to="../mainpage" style={{ textDecoration: "none" }}>
                <NftAddButton
                  backgroundcolor="rgb(255,255,255)"
                  color="#44C97C"
                  border="1px solid #44C97C"
                  type="button"
                  height="54"
                  radius="3"
                  margin="0px"
                >
                  <span class="css-ymwvow e4nu7ef1">취소</span>
                </NftAddButton>
              </Link>
              <NftAddButton
                onClick={() => {
                  onClickAddNft();
                }}
                backgroundcolor="#44C97C"
                color="rgb(255,255,255)"
                border="0px none"
                type="button"
                height="54"
                radius="3"
                margin="0px"
              >
                <span class="css-ymwvow e4nu7ef1">등록</span>
              </NftAddButton>
            </div>
          </div>
        </div>
        <div className="mynft_text">내가 보유한 NFT</div>
        <div className="my_nft">
          {nftCollection?.map((nftListEachCollection) =>
            nftListEachCollection?.map((nft) => {
              const getNftInfo = () => {
                setnftTitle(nft.name);
                setnftContent(nft.description);
                setnftitemImg(nft.image);
                setnftEdition(nft.edition);
              };
              return (
                <div>
                  <img
                    src={nft.image}
                    onClick={getNftInfo}
                    className="nftImage"
                  />
                  <div className="nftImage_disc">
                    <p>{nft.name}</p>
                    <p>{nft.description}</p>
                    <div>
                      {nft.attributes.map((attribute) => {
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
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default AddNft;

const NftAddButton = styled.button`
  display: flex;
  padding: 0px 10px;
  justify-content: center;
  text-align: center;
  width: 200px;
  height: 54px;
  border-radius: 10px;
  line-height: 54px;
  font-weight: bold;

  background-color: ${(props) => props.backgroundcolor};
  color: ${(props) => props.color};
  border: ${(props) => props.border};
  margin-top: ${(props) => props.margin};
`;

const NftAddLeft = styled.input`
  border: 1px solid grey;
  align-items: center;
  font-size: 15px;

  width: 374px;
  height: 55px;
  margin-left: 40px;
  line-height: 55px;
  border-radius: 10px;
  padding-left: 15px;
`;
