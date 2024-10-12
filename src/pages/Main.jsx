import React, { useEffect } from "react";
import styled from "styled-components";
import { HeaderBottom, HeaderTop } from "../components/common/Header";
import UploadField from "../components/common/UploadField";
import Mainstory from "../components/Main/Mainstory";
import Mainlive from "../components/Main/Mainlive";
import MainGroup from "../components/Main/MainGroup";
import Mainpage from "../components/Main/Mainpage";
import Mainupload from "../components/Main/Mainupload";
import { auth } from "../firebase";
// import Mainbutton from "../components/Main/Mainbutton";

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
  margin-bottom: 20px;
  width: 1050px;
  padding: 0 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  /* padding: 28px 20px; */
  /* position: absolute; */
  top: 140px;
  @media screen and (max-width: 768px) {
    top: 70px;
  }
`;

const Main = () => {
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
        <Mainupload />

        {/* <PostUploadField /> */}
        {/* <MainGroup /> */}
        <Mainpage />
        {/* <Mainlive /> */}
      </MainSection>
    </Wrapper>
  );
};

export default Main;
