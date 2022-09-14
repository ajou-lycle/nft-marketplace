import React from "react";
import EditNft from "../nft/EditNft";
import Menu from "../components/common/Menu";
import Header from "../components/common/header";
import { BrowserRouter } from "react-router-dom";

export default function PageEditNft() {

return(
    <div>
        <BrowserRouter>
        <Header/>
        <Menu/>
        <EditNft/>
        </BrowserRouter>
    </div>
    );
}