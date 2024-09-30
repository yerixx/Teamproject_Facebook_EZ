import React from "react";
// import { MainHeader01Style } from "../styles/GlobalStyles.styles";
import styled from "styled-components";
import { HeaderBottom, HeaderTop } from "../components/common/Header";
// import LeftSideBar from "../components/common/LeftSideBar";

import ModalCont from "../components/Modal/ModalCont";
import RightSideBar from "../components/common/RightSideBar";
import ModalLive from "../components/Modal/ModalLive";

const Wrapper = styled.div`
  height: 2000px;
  width: 100%;
`;
const MainSection = styled.section`
  display: flex;
  justify-content: center;
  padding: 28px 20px;
`;
const Maintest = styled.div`
  width: 1000px;
  border: 1px solid #f00;
`;
const Main = () => {
  return (
    <Wrapper>
      <HeaderTop />
      <HeaderBottom />
      <MainSection>
        {/* <LeftSideBar /> */}
        {/* <Maintest></Maintest> */}
        <ModalLive/>
        <RightSideBar />
      </MainSection>
      <ModalCont />
    </Wrapper>
  );
};

export default Main;
