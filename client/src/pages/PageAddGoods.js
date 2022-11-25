import React from "react";
import AddGoods from "../goods/AddGoods";
import Menu from "../components/common/Menu";
import Header from "../components/common/header";
import ScrollTop from "../ScrollTop";

export default function PageAddGoods() {

return(
    <div>
        <ScrollTop/>
        <Header/>
        <Menu/>
        <AddGoods/>
    </div>
    );
}