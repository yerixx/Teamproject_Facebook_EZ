import styled from "styled-components";
import { HeaderBottom, HeaderTop } from "../components/common/Header";
// import LeftSideBar from "../components/common/LeftSideBar";
import MainContents from "../components/MainPage/MainContents";
import ModalCont from "../components/Modal/ModalCont";

const Wrapper = styled.div`
  height: 2000px;
  width: 100%;
`;
const MainSection = styled.section`
  display: flex;
  justify-content: center;
  padding: 28px 20px;
`;
const Main = () => {
  return (
    <Wrapper>
      <HeaderTop />
      <HeaderBottom />
      <MainSection>
        {/* <LeftSideBar /> */}
        <MainContents />
        {/* <LeftSideBar /> */}
      </MainSection>
      <ModalCont />
    </Wrapper>
  );
};

export default Main;
