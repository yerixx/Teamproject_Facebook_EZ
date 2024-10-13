import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import { HeaderBottom, HeaderTop } from "../components/common/Header";
import PostUpload from "../components/common/PostUpload";
import Mainstory from "../components/Main/Mainstory";
import Mainlive from "../components/Main/Mainlive";
import MainGroup from "../components/Main/MainGroup";
import Mainpage from "../components/Main/Mainpage";
import { auth } from "../firebase";
import ModalCont from "../components/Modal/ModalCont";
import { DataStateContext } from "../App";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PostUploadField = styled.div`
  background-color: ${(props) => props.theme.ContainColor};
  box-shadow: var(--box-shadow-01);
  margin-top: 30px;
  padding: 20px 0;
  border-radius: var(--border-radius-30);
`;
const MainSection = styled.section`
  margin-bottom: 20px;
  width: 1050px;
  padding: 0 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  top: 140px;
  @media screen and (max-width: 768px) {
    top: 70px;
  }
`;

const Main = () => {
  const state = useContext(DataStateContext);
  console.log(state);
  useEffect(() => {
    // console.log(auth.currentUser);
  }, []);
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
        <PostUploadField>
          <PostUpload />
        </PostUploadField>
        <MainGroup />
        <Mainpage />
      </MainSection>
    </Wrapper>
  );
};

export default Main;
