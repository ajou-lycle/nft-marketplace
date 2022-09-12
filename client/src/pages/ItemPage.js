import React from "react";
import Header from "../components/common/header";
import { useEffect } from "react";
import axios from "axios";

export default function ItemPage() {


  useEffect(() => {
    axios.get('http://localhost:8080/item?title=dmswn&sort=recent&size=3&page=0', {
      
    }).then((res) => {
      console.log("res.data:", res.data);
      console.log("아이템 목록 조회 성공");
      
    }).catch((err) => {
      console.log("err: ", err);
    });
  }, []);

  return(
    <div>
      <Header/>
      <div>
        아이템 목록 조회
      </div>
    </div>

  );
}