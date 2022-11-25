import React from "react";
import ContentGoods from "../goods/ContentGoods";
import Menu from "../components/common/Menu";
import Header from "../components/common/header";
import ScrollTop from "../ScrollTop";

export default function PageContentGoods() {

return(
    <div>
        <ScrollTop/>
        <Header/>
        <ContentGoods/>
    </div>
    );
}