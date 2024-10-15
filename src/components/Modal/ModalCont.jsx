import React, { useState } from "react";
import { styled } from "styled-components";

import EditeBox from "../common/EditeBox.jsx";
import SocialBtnIcon from "../common/SocialBtnIcon.jsx";

import { BsThreeDots } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { FaEarthAmericas } from "react-icons/fa6";

import testCat from "/img/testcat.jpg";

import {
  MainTitle_18_b,
  SubDescription_16_n,
  SubDescription_14_n,
} from "../../styles/GlobalStyles.styles.js";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--color-black);
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
  position: absolute;
  top: 0;
  right: 10px;
  @media screen and (max-width: 768px) {
    width: 100%;
    position: absolute;
    top: 20px;
  }
`;
const EditeIcon = styled.div`
  position: absolute;
  top: 33px;
  right: 50px;
  font-size: 20px;
  cursor: pointer;
  @media screen and (max-width: 768px) {
    * {
      color: var(--color-white);
    }
    .optionList {
      box-shadow: none;
    }
    .optionItem {
      color: black;
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
  width: 780px;
  height: 580px;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 390px;
    object-fit: cover;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.2);
    }
    @media screen and (max-width: 768px) {
      width: 100%;
      height: 390px;
      object-fit: cover;
      &:hover {
        transform: scale(1);
      }
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
    @media screen and (max-width: 768px) {
      width: 60px;
      height: 60px;
    }
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
    ${MainTitle_18_b}
    @media screen and (max-width: 768px) {
      color: var(--color-white);
    }
  }
  .profiledesc {
    display: flex;
    gap: 4px;
    ${SubDescription_14_n}
    @media screen and (max-width: 768px) {
      color: var(--color-white);
    }
  }
`;
const ModalDesc = styled.div`
  ${SubDescription_16_n}
  width: 100%;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
    padding-bottom: 15px;
    @media screen and (max-width: 1050px) {
      padding: 20px;
      font-size: 14px;
    }
  }
`;
const SocialIcon = styled.div`
  * {
    display: flex;
    justify-content: space-around;
    gap: 40px;
    ${SubDescription_14_n}
  }
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

const ModalCont = ({ post }) => {
  const [closeBtn, setCloseBtn] = useState(false);
  const closeButton = () => {
    setCloseBtn(true);
  };
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  return (
    <Wrapper style={{ display: closeBtn ? "none" : "block" }}>
      {/* Desktop */}
      <DeskTop>
        <LeftContent>
          <ArrowBtn></ArrowBtn>
          <Trigger></Trigger>
          <ImageContent>
            <img src={post.image} />
          </ImageContent>
        </LeftContent>
        <RightContent>
          <ControlsIcon>
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
              <div className="profiledesc">
                {formatDate(post.createdAt)}{" "}
                <FaEarthAmericas
                  style={{
                    fontSize: "14px",
                    color: "black",
                    marginTop: "4px",
                  }}
                />
              </div>
            </ModalProfileSelf>
          </ModalProfileImg>
          <ModalDesc>
            <p>{post.content}</p>
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
            <img src={post.image} alt="ModalProfileImg" />
          </div>
          <ModalProfileSelf>
            <div className="profileName">박예림</div>
            <div className="profiledesc">{formatDate(post.createdAt)}</div>
          </ModalProfileSelf>
        </ModalProfileImg>
        <ImageContent>
          <img src={post.image} />
        </ImageContent>
        <ModalDesc>
          <p>{post.content}</p>
        </ModalDesc>
        <SocialIcon>
          <SocialBtnIcon />
        </SocialIcon>
      </Mobile>
    </Wrapper>
  );
};

export default ModalCont;
