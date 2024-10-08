import React, { useState } from "react";
import styled from "styled-components";
import SocialBtnIcon from "../common/SocialBtnIcon.jsx";
import UploadField from "../common/UploadField.jsx";
import EditeBox from "../common/EditeBox.jsx";

// react-icon
import { BsThreeDots } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";

//font
import {
  MainTitle_22_b,
  MainTitle_18_b,
  MainTitle_18_n,
  SubDescription_16_n,
  SubDescription_14_n,
} from "../../styles/GlobalStyles.styles.js";

const Wrapper = styled.section`
  border-radius: var(--border-radius-30);
  padding-top: 50px;
  width: calc(100% - 90px);
  margin: 0 auto;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: var(--box-shadow-01);
  @media (max-width: 768px) {
    width: 90%;
  }
`;
const Inner = styled.article`
  width: var(--inner-width-02);
  height: 100%;
  padding: 0 90px;
  @media (max-width: 768px) {
    max-width: 100%;
    padding: 0 20px;
  }
`;
const Profile = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 100%;
  }
  .profileContent {
    display: flex;
    align-items: center;
    gap: 20px;
    @media (max-width: 768px) {
      width: 100%;
    }
    .profileImg {
      width: 80px;
      height: 80px;
      background: var(--color-gray-01);
      border-radius: 100px;
    }
    .profileName {
      ${MainTitle_22_b}
      /* color:var(--color-gray-01); */
      @media (max-width: 768px) {
        ${MainTitle_22_b}
      }
    }
    .profileDesc {
      ${SubDescription_16_n}
      padding:4px 0;
      color: var(--color-gray-01);
      @media (max-width: 768px) {
        ${MainTitle_18_n}
      }
    }
  }
  .ControlsIcon {
    display: flex;
    gap: 0;
    font-size: 24px;
    cursor: pointer;
    transition: opacity 0.5s;
    *:hover {
      color: var(--color-facebookblue);
    }

    @media (max-width: 768px) {
      font-size: 30px;
    }
  }
`;
const Contents = styled.div`
  position: relative;
  padding: 30px 0 0;
  .contentDesc {
    ${SubDescription_16_n};
    font-weight: normal;
    word-break: break-all;
    margin-bottom: 30px;
    @media (max-width: 768px) {
      ${SubDescription_14_n}
    }
  }
  .contentImgs {
    display: flex;
    justify-content: space-between;
    padding: 30px 0;
  }
  .Buttons {
    width: 100%;
    display: flex;
    justify-content: space-between;
    position: absolute;
    top: 55%;
    .btnLeft,
    .btnRight {
      padding: 20px 23px;
      font-size: 20px;
      background: var(--color-light-gray-02);
      border-radius: 50%;
      transition: opacity 0.5s;
      cursor: pointer;
      &:hover {
        opacity: 0.5;
      }
    }
    .btnLeft {
      transform: translateX(-30px);
    }
    .btnRight {
      transform: translateX(30px);
    }
  }
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;
const ContImg = styled.img`
  margin-bottom: 30px;
  width: 100%;
  height: 350px;
  background: var(--color-light-gray-01);
  object-fit: cover;
  @media (max-width: 768px) {
    max-width: 100%;
    height: 250px;
  }
`;

const PostItem = ({ imageSrc, contentDesc }) => {
  const postId = "12345"; // 실제 포스트 ID
  const isLiked = false; // 초기 좋아요 여부

  return (
    <Wrapper>
      <Inner>
        <Profile>
          <div className="profileContent">
            <div className="profileImg"></div>
            <div className="profileText">
              <h1 className="profileName">박예림</h1>
              <p className="profileDesc"> 8시간전</p>
            </div>
          </div>
          <div className="ControlsIcon">
            <div style={{ zIndex: 999 }}>
              <EditeBox Title={<BsThreeDots className="ControlsIcon" />} />
            </div>
            <div>
              <IoCloseOutline />
            </div>
          </div>
        </Profile>
        <Contents>
          <div className="contentDesc">
            {contentDesc || "우리의 여행 sub folder만 몇 개인지 모르겠다. "}
          </div>
          {imageSrc && <ContImg src={imageSrc} alt={"Content Image"} />}
        </Contents>
        <SocialBtnIcon postId={postId} isLiked={isLiked} />
        <UploadField />
      </Inner>
    </Wrapper>
  );
};

export default PostItem;
