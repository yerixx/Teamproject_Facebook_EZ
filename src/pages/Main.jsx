import React from "react";
import { HeaderTop1, HeaderBottom1 } from "../components/common/Header";
// import {
//   MainHeader01Style,
//   MainHeader02Style,
// } from "../styles/GlobalStyles.styles";
import styled from "styled-components";

// const MainHeader = styled.h1`
//   ${MainHeader01Style}
// `;

const Main = () => {
  return (
    <div>
      <HeaderTop1 />
      {/* <MainHeader>정면돌파</MainHeader> */}
      <h1>화이팅</h1>
      <HeaderBottom1 />
    </div>
  );
};

export default Main;
