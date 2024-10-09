import React from "react";
// import { MainHeader01Style } from "../styles/GlobalStyles.styles";
import styled from "styled-components";
import { HeaderBottom, HeaderTop } from "../components/common/Header";
// import LeftSideBar from "../components/common/LeftSideBar";
import ModalCont from "../components/Modal/ModalCont";
// import { useContext } from "react";
// import { DataDispatchContext, DataStateContext } from "../App";
import MainPage from "../components/Main/Mainpage";
import Mainupload from "../components/Main/Mainupload";
import Mainstory from "../components/Main/Mainstory";
import Mainlive from "../components/Main/Mainlive";
import MainGroup from "../components/Main/MainGroup";
import PostUploadField from "../components/common/PostUploadField";
// import Mainbutton from "../components/Main/Mainbutton";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MainSection = styled.section`
  width: var(--inner-width-02);
  padding: 0 90px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  /* padding: 28px 20px; */
  position: absolute;
  top: 140px;
  @media screen and (max-width: 768px) {
    top: 80px;
  }
`;

// const Maintest = styled.div`
//   width: 1000px;
//   border: 1px solid #f00;
// `;

const Main = () => {
  // const { onCreatePost } = useContext(DataDispatchContext);
  // const { posts } = useContext(DataStateContext);
  // const create = () => {
  //   onCreatePost("1", "sldkjf");
  // };
  return (
    <Wrapper>
      <HeaderTop />
      <HeaderBottom />
      {/* <SideBarWallet /> */}
      {/* <SideBarGroup /> */}
      {/* <SideBarMenu /> */}
      <MainSection>
        <Mainstory />
        <Mainupload />
        {/* <PostUploadField /> */}
        <MainGroup />
        <MainPage />
        {/* <Maintest>
          <button onClick={create}>생성</button>
          {posts.map((item, i) => (
            <div key={i}>{item.content}</div>
          ))}
        </Maintest> */}
        <Mainlive />
      </MainSection>
    </Wrapper>
  );
};

export default Main;
