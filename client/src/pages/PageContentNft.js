import React from "react";
import ContentNft from "../nft/ContentNft";
import Menu from "../components/common/Menu";
import Header from "../components/common/header";
import ScrollTop from "../ScrollTop";

export default function PageContentNft() {

return(
    <div>
        <ScrollTop/>
        <Header/>
        <ContentNft/>
    </div>
  );
}

