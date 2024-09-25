import styled from "styled-components";
import { HeaderBottom1, HeaderTop1 } from "../components/common/Header";
import LeftSideBar from "../components/common/LeftSideBar";
import MainContents from "../components/MainPage/MainContents";

const Wrapper = styled.div`
  height: 2000px;
`;
const MainSection = styled.section`
  display: flex;
  justify-content: space-between;
  padding: 28px 20px;
`;
const Main = () => {
  return (
    <Wrapper>
      <header>
        <HeaderTop1 />
        <HeaderBottom1 />
      </header>
      <MainSection>
        <LeftSideBar />
        <MainContents />

        <LeftSideBar />
      </MainSection>
    </Wrapper>
  );
};

export default Main;
