import React from "react";
import styled from "styled-components";
import SocialBtnIcon from "../common/SocialBtnIcon.jsx";

import testCat from "/img/testcat.jpg";

//font
import {
  MainTitle_18_b,
  MainTitle_18_n,
  SubDescription_12_m,
} from "../../styles/GlobalStyles.styles.js";

const Inner = styled.article`
  display: flex;
  width: 260px;
  height: 350px;
  cursor: pointer;
  /* 미디어 쿼리 */
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    width: 160px;
    height: 200px;
  }
`;
const Contents = styled.div`
  border: 1px solid var(--color-light-gray-02);
  border-radius: var(--border-radius-08);
  box-shadow: var(--box-shadow-01);
  /* 미디어 쿼리 */
  @media (max-width: 768px) {
    width: 160px;
    height: 200px;
  }
`;
const ContImg = styled.img`
  width: 260px;
  height: 200px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
  @media (max-width: 768px) {
    width: 160px;
    height: 140px;
  }
`;
const ContText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 26px 30px 30px;
  .contTitle {
    ${MainTitle_18_b}
    @media (max-width : 768px) {
      ${SubDescription_12_m}
      width:160px;
      margin-left: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .contDesc {
    ${MainTitle_18_n}
    color:var(--color-gray-02);

    @media (max-width: 768px) {
      ${SubDescription_12_m}
      width:160px;
      margin-left: 4px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  @media (max-width: 768px) {
    width: 80%;
    padding: 0;
  }
`;

const PhotoVideoItem = ({ title, desc, imageSrc }) => {
  return (
    <Inner>
      <Contents>
        <ContImg src={imageSrc || testCat} alt="contentImage" />
        <ContText>
          <div className="contTitle">{title || "Summer~ ✨"}</div>
          <div className="contDesc">{desc || "18 Image"} </div>
        </ContText>
        {/* <SocialBtnIcon/> */}
      </Contents>
    </Inner>
  );
};

export default PhotoVideoItem;
