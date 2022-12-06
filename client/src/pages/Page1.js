import React from "react";
import Header from "../components/common/header";
import NftItem from "../components/common/Item";
import Menu from "../components/common/Menu";
import ScrollTop from "../ScrollTop";
import { Link } from "react-router-dom";

export default function Page1() {
  return (
    <div>
      <ScrollTop />
      <Header />
      <div className="survey_bt">
        간단한 설문조사를 시행해주시면 추첨을 통해 이벤트 상품을 드립니다!
        <button
          margin="0px auto"
          className="go_survey_bt"
          onClick={() => {
            window.open("https://forms.gle/MRpbR2UiVDqTtWyM9");
          }}
        >
          설문조사 하기
        </button>
      </div>
      <Menu />
      <NftItem />
    </div>
  );
}
