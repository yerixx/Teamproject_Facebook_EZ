import styled from "styled-components";
import { HeaderBottom1, HeaderTop1 } from "../components/common/Header";
import LeftSideBar from "../components/common/LeftSideBar";
import Mainpage from "../components/Main/Mainpage";

const Wrapper = styled.div`
  width: 100%;
  height: 2000px;
`;

const MainHeader = styled.h1`
  ${MainHeaderStyle}
`;

const Main = () => {
  return (
    <Wrapper>
      <HeaderTop1 />
      <HeaderBottom1 />
      <Mainpage />
      <Mainpage />
    </Wrapper>
  );
};

export default Main;
