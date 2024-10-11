import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";

import { faXmark } from "@fortawesome/free-solid-svg-icons";
import testCat from "/img/testcat.jpg";
import testImg from "/img/testImg.png";

import SocialBtnIcon from "../common/SocialBtnIcon";

import {
  SubTitle_16_b,
  SubDescription_14_n,
} from "../../styles/GlobalStyles.styles.js";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  position: absolute;
  top: 0;
  left: 0;
`;
const DeskTop = styled.div`
  width: 100%;
  display: flex;
  @media (max-width: 768px) {
    display: none;
  }
`;

const LeftContent = styled.section`
  flex: 2;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: rgba(0, 0, 0, 0.9);
`;
const RightContent = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  padding-top: 40px;
  gap: 20px;
  background: #fff;
`;
const Xmark = styled.div`
  .faXmark {
    position: absolute;
    top: 33px;
    right: 30px;
    color: #fff;
    font-size: 25px;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const ArrowBtn = styled.div``;
const Trigger = styled.div``;

const ImageContent = styled.div`
  width: 800px;
  height: 700px;
  position: relative;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 390px;
    object-fit: cover;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    @media screen and (max-width: 768px) {
      width: 100%;
      height: 390px;
      object-fit: cover;
    }
  }
`;
const ModalProfileImg = styled.div`
  width: 100%;
  padding: 0 40px;
  display: flex;
  .profileImg {
    width: 80px;
    height: 80px;
    background-color: var(--color-light-gray-02);
    border-radius: 50%;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
  }
  @media screen and (max-width: 768px) {
    padding: 50px 20px;
  }
`;
const ModalProfileSelf = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  margin-left: 20px;
  .profileName {
    ${SubTitle_16_b}
    @media screen and (max-width: 768px) {
      color: var(--color-white);
    }
  }
  .profiledesc {
    ${SubDescription_14_n}
    @media screen and (max-width: 768px) {
      color: var(--color-white);
    }
  }
`;
const ModalDesc = styled.div`
  width: 100%;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: var(--font-size-description-01);
  color: var(--color-gray-01);
  @media screen and (max-width: 1050px) {
    width: 100%;
    height: 100px;
    padding: 0;
    font-size: 14px;
    overflow-y: scroll;
    color: var(--color-white);
    background: rgba(0, 0, 0, 0.5);
  }
  p {
    word-wrap: keep-all;
    border-bottom: 1px solid var(--color-light-gray-01);
    padding-bottom: 15px;
    font-size: var(--font-size-description-01);
    @media screen and (max-width: 1050px) {
      padding: 20px;
      font-size: 14px;
    }
  }
`;
const SocialIcon = styled.div`
  width: 90%;
  @media (max-width: 768px) {
    position: absolute;
    width: 100%;
    bottom: 0;
    * {
      color: var(--color-white);
    }
  }
`;
const Mobile = styled.div`
  display: none;
  @media (max-width: 768px) {
    display: block;
    width: 100%;
    background-color: rgba(0, 0, 0, 0.9);
  }
`;

const ModalLive = () => {
  return (
    <Wrapper>
      {/* Desktop */}
      <DeskTop>
        <LeftContent>
          <Xmark>
            <FontAwesomeIcon className="faXmark" icon={faXmark} />
          </Xmark>
          <ArrowBtn></ArrowBtn>
          <Trigger></Trigger>
          <ImageContent>
            <img src={testImg} />
          </ImageContent>
        </LeftContent>
        <RightContent>
          <ModalProfileImg>
            <div className="profileImg">
              <img src={testCat} alt="ModalProfileImg" />
            </div>
            <ModalProfileSelf>
              <div className="profileName">미니멀데이</div>
              <div className="profiledesc">6시간 전</div>
            </ModalProfileSelf>
          </ModalProfileImg>
          <ModalDesc>
            <p>아침, 저녁 젤 바쁜 방학의 일요일이 끝났다 😎💪🏻</p>
          </ModalDesc>
          <SocialIcon>
            <SocialBtnIcon />
          </SocialIcon>
        </RightContent>
      </DeskTop>
      {/* mobile */}
      <Mobile>
        <Xmark>
          <FontAwesomeIcon className="faXmark" icon={faXmark} />
        </Xmark>
        <ModalProfileImg>
          <div className="profileImg">
            <img src={testCat} alt="ModalProfileImg" />
          </div>
          <ModalProfileSelf>
            <div className="profileName">박예림</div>
            <div className="profiledesc">6시간 전</div>
          </ModalProfileSelf>
        </ModalProfileImg>
        <ImageContent>
          <img src={testImg} />
        </ImageContent>
        <ModalDesc>
          <p>
            아침, 저녁 젤 바쁜 방학의 일요일이 끝났다 😎💪🏻 <br /> 또 다시
            월요일이라니!!
            <br />
            월요팅 하세요~~
          </p>
        </ModalDesc>
        <SocialIcon>
          <SocialBtnIcon />
        </SocialIcon>
      </Mobile>
    </Wrapper>
  );
};

export default ModalLive;
