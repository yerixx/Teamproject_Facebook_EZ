import styled from "styled-components";

import { HeaderBottom1, HeaderTop1 } from "../components/common/Header";
// import LeftSideBar from "../components/common/LeftSideBar";
import PostInputField from "../components/detail/PostInputField"
import Mainpage from "../components/Main/Mainpage";
import Mainupload from "../components/Main/Mainupload";

const Wrapper = styled.div`
  width: 100%;
  height: 2000px;
`;

const Main = () => {
  return (
    <Wrapper>
      <HeaderTop1 />
      <HeaderBottom1 />
      <PostInputField/>
      <Mainupload />
      <Mainpage />
      <Mainpage />
    </Wrapper>
  );
};

export default Main;
