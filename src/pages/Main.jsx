import React from "react";
import styled from "styled-components";
import { HeaderBottom, HeaderTop } from "../components/common/Header";
import MainPage from "../components/Main/Mainpage";
import UploadField from "../components/common/UploadField";
import Mainstory from "../components/Main/Mainstory";
import Mainlive from "../components/Main/Mainlive";
import MainGroup from "../components/Main/MainGroup";
import Mainupload from "../components/Main/Mainupload";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  /* overflow: auto; */
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const MainSection = styled.section`
  margin-top: 20px;
  width: 1050px;
  padding: 0 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  /* padding: 28px 20px; */
  position: absolute;
  top: 140px;
  @media screen and (max-width: 768px) {
    top: 70px;
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
      <MainSection>
        <Mainstory />
        <Mainupload />
        {/* <PostUploadField /> */}
        <MainGroup />
        <MainPage />
        <MainPage />
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
