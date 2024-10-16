import React, { useState } from "react";
import styled from "styled-components";

import { HeaderBottom, HeaderTop } from "../components/common/Header.jsx";
import PostUpload from "../components/common/PostUpload.jsx";
import PhotoVideoList from "../components/Mypage/PhotoVideoList.jsx";
import PostList from "../components/Mypage/PostList.jsx";
import TopCover from "../components/Mypage/TopCover.jsx";
import {
  MainTitle_18_n,
  SubDescription_14_n,
} from "../styles/GlobalStyles.styles.js";
import { motion } from "framer-motion";

const Wrapper = styled.div`
  width: 100%;
  height: fit-content;
  margin: 0 auto;
  box-shadow: var(--box-shadow-01);
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Inner = styled.div`
  width: var(--inner-width-02);
  height: fit-content;
  margin: 0 auto;
  border-radius: 30px 30px 0 0;
  box-shadow: var(--box-shadow-01);
  @media (max-width: 768px) {
    border-radius: 0;
    max-width: 100%;
  }
`;

const ContChangeBtn = styled(motion.div)`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px 0;
  position: relative;
  border-bottom: 1px solid var(--color-light-gray-01);
  @media (max-width: 768px) {
    bottom: -60px;
  }

  .postBtn {
    ${MainTitle_18_n}
    color: ${(props) => props.theme.textColor};
    font-weight: 600;
    flex: 1;
    background: none;
    border: none;
    padding-bottom: 10px;
    position: relative;
    cursor: pointer;
    margin: 0 20px;

    @media (max-width: 768px) {
      ${SubDescription_14_n}
    }
  }

  .underline {
    position: absolute;
    bottom: -2px;
    height: 4px;
    background-color: var(--color-facebookblue);
    width: 33%;
  }
`;

const UploadInner = styled.div`
  margin: 40px auto;
  width: 820px;
  background-color: ${(props) => props.theme.ContainColor};
  box-shadow: var(--box-shadow-01);
  padding: 10px 0px;
  border-radius: var(--border-radius-30);
  @media (max-width: 768px) {
    width: 90vw;
    height: 80px;
    margin: 80px auto 20px;
  }
`;

const Mypage = () => {
  const [id, setId] = useState(0);
  const [upload, setUpload] = useState(false);

  const handleClick = (tabId) => {
    setId(tabId);
    setUpload((prev) => !prev);
  };
  const nope = () => {
    alert("서비스 준비중 입니다");
  };
  return (
    <Wrapper>
      <HeaderTop />
      <HeaderBottom />
      <Inner>
        <TopCover />
        <ContChangeBtn>
          <button className="postBtn" onClick={() => handleClick(0)}>
            게시글
          </button>
          <button className="postBtn" onClick={() => handleClick(1)}>
            사진 및 동영상
          </button>
          <button className="postBtn" onClick={nope}>
            내 지갑
          </button>
          <motion.div
            className="underline"
            layoutId="underline"
            style={{
              width: "33.33%",
              left: id === 0 ? "0%" : "33%",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        </ContChangeBtn>
        <UploadInner style={{ display: !upload ? "block" : "none" }}>
          <PostUpload placeholder="오늘 어떤일이 있으셨나요?" />
        </UploadInner>
        <div style={{ display: id === 0 ? "block" : "none" }}>
          <PostList />
        </div>
        <div style={{ display: id === 1 ? "block" : "none" }}>
          <PhotoVideoList />
        </div>
      </Inner>
    </Wrapper>
  );
};

export default Mypage;
