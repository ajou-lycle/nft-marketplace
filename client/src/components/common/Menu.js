import styled from "styled-components";
import React, { useEffect } from "react";
import { useRecoilState } from "recoil";
import { useState } from "react";
import { useNavigate, NavLink, Navigate } from "react-router-dom";
import { idState, isLogin } from "../../recoil/User";
import "./Menu.css";

function Menu() {
  const [click1, setClick1] = useState("content_bar_1_true");
  const [click2, setClick2] = useState("content_bar_2_false");

  const contentBar1 = () => {
    setClick1("content_bar_1_true");
    setClick2("content_bar_2_false");
  };
  const contentBar2 = () => {
    setClick1("content_bar_1_false");
    setClick2("content_bar_2_true");
  };

  return (
    <div>
      <div className="main_disc">
        <div className="main_disc_in">Barter your Life-Cycle, LYCLE </div>
      </div>

      <div className="menuButton">
        <NavLink
          to="/mainpage"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          border="0px none"
          type="button"
          style={{
            textDecoration: "none",
            borderRadius: "50px",
            marginRight: "20px",
          }}
        >
          MARKET
        </NavLink>

        <NavLink
          to="/goods"
          className={({ isActive }) => (isActive ? "active" : "inactive")}
          style={{
            textDecoration: "none",
            borderRadius: "50px",
            marginLeft: "20px",
          }}
        >
          GOODS
        </NavLink>
      </div>
    </div>
  );
}

export default Menu;
