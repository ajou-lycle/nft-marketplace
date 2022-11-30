import React, { useEffect, useState } from "react";
import "../nft/AddNft.css";
import styled from "styled-components";
import axios from "axios";

function AddGoods() {
  const [itemImg, setgoodsitemImg] = useState("");
  const [goodstitle, setgoodsTitle] = useState("");
  const [goodsprice, setgoodsPrice] = useState(0);
  const [goodscontent, setgoodsContent] = useState("");
  const [files, setFiles] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [localImageURL, setLocalImageURL] = useState("");

  const onClickAddGoods = async (e) => {
    if (e && e.preventDefault) e.preventDefault();

    console.log("handleSubmit시작됨");
    console.log("add goods");

    let formData = new FormData();
    let userData = {
      itemImg: localImageURL,
      title: goodstitle,
      price: goodsprice,
      content: goodscontent,
    };

    console.log(userData);

    formData.append("file", imageFile);
    formData.append(
      "postItemDto",
      new Blob([JSON.stringify(userData)], {
        type: "application/json",
      })
    );

    // convertURLtoFile(goodsitemImg).then((file) => {
    //     setgoodsitemImg(file);
    //   });

    console.log(formData.get("file"));
    console.log(formData.get("postItemDto"));

    // for (var entries of formData.keys()) console.log(entries);

    await axios
      .post("http://3.38.210.200:8080/item", formData, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user_token")}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log("res.data", res.data);
        alert("등록이 완료되었습니다!");
        document.location.href = "/mainPage";
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const onLoadFile = (e) => {
    if (!e.target.files) {
      return;
    }
    console.log(e.target.files[0]);
    setImageFile(e.target.files[0]);
    setLocalImageURL(URL.createObjectURL(e.target.files[0]));
    console.log(localImageURL);
  };

  return (
    <div className="whole_nft_add">
      <div className="whole_center_nft_add">
        <div className="nft_add_form">
          <div className="nft_add_form_disc">
            <div className="nft_add_form_disc_1">
              <div className="nft_add_form_disc_1_2">
                <div className="addnft_title">
                  <div className="addnft_title_text">GOODS 등록</div>
                </div>
              </div>
            </div>
            <div className="add_things">
              <form>
                <input
                  type="file"
                  id="goodsitemImg"
                  accept="image/*"
                  onChange={onLoadFile}
                />
              </form>
              <dl className="add_name">
                <dt className="d_left">GOODS NAME</dt>
                <dd>
                  <GoodsAddLeft
                    type="text"
                    id="goodstitle"
                    placeholder="Enter Goods name"
                    value={goodstitle}
                    onChange={(e) => setgoodsTitle(e.target.value)}
                  ></GoodsAddLeft>
                </dd>
              </dl>
              <dl className="add_image">
                <dt className="d_left">GOODS CONTENT</dt>
                <dd>
                  <textarea
                    id="goodscontent"
                    placeholder="Enter Goods content"
                    value={goodscontent}
                    onChange={(e) => setgoodsContent(e.target.value)}
                    style={{
                      width: "350px",
                      padding: "20px",
                      height: "70px",
                      resize: "none",
                      border: "1px solid grey",
                    }}
                  />
                </dd>
              </dl>
              {/* <dl className="add_content">
                            <dt className="d_left">GOODS IMAGE</dt>
                            <dd><GoodsAddLeft type='text' id="goodsitemImg" placeholder="Enter Goods image" value={goodsitemImg} onChange={(e) => setgoodsitemImg(e.target.value)}></GoodsAddLeft></dd>
                        </dl> */}
              <dl className="add_content">
                <dt className="d_left">GOODS PRICE</dt>
                <dd>
                  <GoodsAddLeft
                    type="number"
                    id="goodsprice"
                    placeholder="Enter Goods price"
                    value={goodsprice}
                    onChange={(e) => setgoodsPrice(e.target.value)}
                  ></GoodsAddLeft>
                </dd>
              </dl>
            </div>

            <div className="nft_add_button">
              <GoodsAddButton
                backgroundcolor="rgb(255,255,255)"
                color="#44C97C"
                border="1px solid #44C97C"
                type="button"
                height="54"
                radius="3"
                margin="0px"
              >
                취소
              </GoodsAddButton>
              <GoodsAddButton
                onClick={() => {
                  onClickAddGoods();
                }}
                backgroundcolor="#44C97C"
                color="rgb(255,255,255)"
                border="0px none"
                type="button"
                height="54"
                radius="3"
                margin="0px"
              >
                등록
              </GoodsAddButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddGoods;

const GoodsAddButton = styled.button`
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

const GoodsAddLeft = styled.input`
  width: 350px;
  height: 50px;
  border: 1px solid grey;
  border-radius: 10px;
  align-items: center;
  font-size: 15px;
  padding-left: 20px;
`;