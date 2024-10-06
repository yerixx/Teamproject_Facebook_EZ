import React from "react";
import styled from "styled-components";
import { HeaderBottom, HeaderTop } from "../components/common/Header";
import MainPage from "../components/Main/Mainpage";
import UploadField from "../components/common/UploadField";
import Mainstory from "../components/Main/Mainstory";
import Mainlive from "../components/Main/Mainlive";
import MainGroup from "../components/Main/MainGroup";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MainSection = styled.section`
  width: 1050px;
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
        <UploadField />
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
