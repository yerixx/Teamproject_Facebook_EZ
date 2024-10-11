import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";

import EditeBox from "../common/EditeBox.jsx";
import SocialBtnIcon from "../common/SocialBtnIcon";

import { BsThreeDots } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";

import testCat from "/img/testcat.jpg";
import testImg from "/img/testImg.png";

import {
  SubTitle_16_b,
  SubDescription_14_n,
} from "../../styles/GlobalStyles.styles.js";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const DeskTop = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  background: var(--color-white);

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
const ControlsIcon = styled.div`
  display: flex;
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const EditeIcon = styled.div`
  position: absolute;
  top: 33px;
  right: 50px;
  font-size: 25px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    * {
      color: var(--color-white);
    }
    .optionItem {
      color: black;
    }
    .optionList {
      box-shadow: none;
    }
  }
`;

const CloseIcon = styled.div`
  position: absolute;
  top: 33px;
  right: 30px;
  font-size: 25px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    color: var(--color-white);
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

const ModalCont = () => {
  const [closeBtn, setCloseBtn] = useState(false);
  const closeButton = () => {
    setCloseBtn(true);
  };

  return (
    <Wrapper style={{ display: closeBtn ? "none" : "block" }}>
      {/* Desktop */}
      <DeskTop>
        <LeftContent>
          <ArrowBtn></ArrowBtn>
          <Trigger></Trigger>
          <ImageContent>
            <img src={testImg} />
          </ImageContent>
        </LeftContent>
        <RightContent>
          <ControlsIcon>
            <EditeIcon>
              <EditeBox
                //이거 쓰면됨
                // handleEditBtn={handleEditBtn}
                Title={<BsThreeDots className="bsThreeDots" />}
              />
            </EditeIcon>
            <CloseIcon onClick={closeButton}>
              <IoCloseOutline
                className="closeIcon"
                // onClick={postDeleteBtn}
              />
            </CloseIcon>
          </ControlsIcon>
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
        <ControlsIcon>
          <EditeIcon>
            <EditeBox
              //이거 쓰면됨
              // handleEditBtn={handleEditBtn}
              Title={<BsThreeDots />}
            />
          </EditeIcon>
          <CloseIcon onClick={closeButton}>
            <IoCloseOutline
              className="closeIcon"
              // onClick={postDeleteBtn}
            />
          </CloseIcon>
        </ControlsIcon>
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

export default ModalCont;
