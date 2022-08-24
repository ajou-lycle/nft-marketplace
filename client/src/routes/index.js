import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "../components/common/header";
import styled from "styled-components";
import Page1 from "../Page1";


export default function RootRoute() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Page1/>} />
        
      </Routes>
    </BrowserRouter>

  );
}