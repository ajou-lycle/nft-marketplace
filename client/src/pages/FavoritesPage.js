import React from "react";
import Header from "../components/common/header";
import styled from "styled-components";
import MyPageMenu from "./MyPageMenu";

export default function FavoritesPage() {

  return(
    <div>
      <Header />
      <div style={{
        display:"flex",
        padding:"10px 0px",
        width:"1100px",
        margin:"0 auto",
        marginTop:"10px",}}>
        <MyPageMenu />
        <div style={{
        display:"flex",
        padding:"10px 0px",
        width:"1100px",
        margin:"0 auto",
        }}>


      <ColumnLine />

      <MyPageContent className="mypage_content">
        <MyPageTitle>My Favorites</MyPageTitle>
        
        <div>
          <ItemBox>NFT ITEM</ItemBox>
          <div>
            
          </div>
        </div>
        

      </MyPageContent>




        </div>
      </div>
    </div>
  );
}



const MyPageContent = styled.div`
  margin-left:10px;
  width: 100%;
  padding: 10px;
`;



const ColumnLine = styled.span`
  display:flex;
  width:1px;
  height:100%;
  background:#ddd;
`;


const MyPageTitle = styled.div`
  font-size:30px;
  font-weight:600;
  margin-bottom:40px;
  margin-left:20px;
`;


const ItemBox = styled.div`
  display:flex;
  margin-right:10px;
  margin-left:20px;
  width:120px;
  font-size:24px;
  border : 2px solid rgb(46, 204, 113);
  justify-content:center;
`;