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
  box-shadow: var(--box-shadow-01);

  @media (max-width: 768px) {
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
    font-weight:600;
    flex: 1;
    background: none;
    border: none;
    /* color: var(--color-gray-01); */
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
    width: 50%;
  }
`;

const UploadInner = styled.div`
  padding: 0 30px;
`;

const Detail = (props) => {
  // const { layoutId } = props;

  const [id, setId] = useState(0);
  const [upload, setUpload] = useState(false);

  const handleClick = (tabId) => {
    setId(tabId);
    setUpload((prev) => !prev);
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
          <motion.div
            className="underline"
            layoutId="underline"
            style={{
              width: "50%",
              left: id === 0 ? "0%" : "50%",
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

export default Detail;
