import React from "react";
import Header from "../components/common/Header";
import { MainHeaderStyle } from "../styles/GlobalStyles.styles";
import styled from "styled-components";


const MainHeader = styled.h1`
  ${MainHeaderStyle}
`

const Main = () => {
  return (
    <div>
      <Header />
      <MainHeader>정면돌파</MainHeader>
      <h1>화이팅</h1>
    </div>
  );
};

export default Main;
