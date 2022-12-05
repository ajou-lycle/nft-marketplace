import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const PurchasesList = () => {
  const memberInfoId = window.localStorage.getItem("memberId");

  const [purchaseItem, setPurchaseItem] = useState("");

  const viewPurchaseItem = () => {
    axios
      .get(`http://3.38.210.200:8080/myPage/buy/${memberInfoId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user_token")}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setPurchaseItem(res.data.itemList);
        console.log("res.data.itemList:", res.data.itemList);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  useEffect(() => {
    viewPurchaseItem();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        padding: "10px 0px",
        width: "1100px",
        margin: "0 auto",
      }}
    >
      <ColumnLine />

      <MyPageContent className="mypage_content">
        <MyPageTitle>Purchase List</MyPageTitle>
        <div className="item_grid" style={{ width: "100%" }}>
          {purchaseItem &&
            purchaseItem.map((rowData) => {
              return (
                <ListBox key={rowData.itemId.toString()}>
                  <Link to={`../contents_goods/${rowData.itemId}`}>
                    <BuyImg>
                      <GoodsImg src={rowData.itemImg} loading="lazy"></GoodsImg>
                    </BuyImg>
                  </Link>
                  <ItemText>
                    <ItemTitle>상품명 : {rowData.title}</ItemTitle>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <ItemCount>구매 수량 : {rowData.count}</ItemCount>
                      <ItemPrice>$ {rowData.price}</ItemPrice>
                    </div>
                  </ItemText>
                </ListBox>
              );
            })}
        </div>
      </MyPageContent>
    </div>
  );
};

const MyPageContent = styled.div`
  margin-left: 10px;
  width: 100%;
  padding: 10px;
`;

const ColumnLine = styled.span`
  display: flex;
  width: 1px;
  height: 100%;
  background: #ddd;
`;

const MyPageTitle = styled.div`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 40px;
  margin-left: 20px;
`;

const ListBox = styled.div`
  width: 100%;
  border: 2px solid #c2edd5;
  border-radius: 20px;
  height: 200px;
  padding: 20px;
  display: flex;
  align-items: center;
  margin-left: 20px;
  margin-right: 20px;
`;

const BuyImg = styled.div`
  /* border: 1px solid red; */
  border-radius: 20px;
  width: 200px;
  height: 200px;
  box-sizing: border-box;
  margin: 0;
`;

const GoodsImg = styled.img`
  /* border: 1px solid black; */
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease-in-out 0s;
  border-radius: 20px;
  vertical-align: top;
`;

const ItemText = styled.div`
  /* border: 1px solid blue; */
  width: 80%;
  display: flex;
  margin-left: 40px;
  margin-right: 30px;
  flex-direction: column;
  /* align-items: center; */
`;

const ItemTitle = styled.div`
  /* border: 1px solid red; */
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 120px;
`;

const ItemCount = styled.div`
  border: 1px solid gray;
  width: 100px;
  border-radius: 5px;
  text-align: center;
  /* align-items: center; */
  font-size: 12px;
  padding: 10px;
`;

const ItemPrice = styled.div`
  /* border: 1px solid black; */
  font-weight: 700;
  font-size: 20px;
`;

export default PurchasesList;
