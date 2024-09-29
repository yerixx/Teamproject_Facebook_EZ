import styled from "styled-components";
import { HeaderBottom1, HeaderTop1 } from "../components/common/Header";
// import LeftSideBar from "../components/common/LeftSideBar";
import Mainpage from "../components/Main/Mainpage";
import Mainupload from "../components/Main/Mainupload";
import Mainstory from "../components/Main/Mainstory";
import Mainlive from "../components/Main/Mainlive";

const Wrapper = styled.div`
  width: 100%;
  height: 2000px;
`;

const Main = () => {
  return (
    <Wrapper>
      <HeaderTop1 />
      <HeaderBottom1 />
      <Mainstory />
      <Mainupload />
      <Mainpage />
      <Mainlive />
    </Wrapper>
  );
};

export default Main;
