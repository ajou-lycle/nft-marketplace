import React from "react";
import AddNft from "../nft/AddNft";
import Menu from "../components/common/Menu";
import Header from "../components/common/header";
import ScrollTop from "../ScrollTop";

export default function PageAddNft() {

return(
    <div>
        <ScrollTop/>
        <Header/>
        {/* <Menu/> */}
        <AddNft/>
    </div>
    );
}