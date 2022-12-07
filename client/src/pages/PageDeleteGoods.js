import React from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function PageDeleteGoods() {
  const { goodsInfoId } = useParams();
  const onClickDeleteGoods = () => {
    let userToken = sessionStorage.getItem("user_token");
    console.log(userToken);
    axios
      .delete(`http://3.38.210.200:8080/item/${goodsInfoId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("user_token")}`,
        },
      })
      .then((res) => {
        console.log("res.data", res.data);
        alert("삭제가 완료되었습니다!");
        document.location.href = "/mainPage";
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  return <button onClick={onClickDeleteGoods}>굿즈 삭제</button>;
}

export default PageDeleteGoods;
