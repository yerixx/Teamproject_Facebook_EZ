import React from "react";
import styled from "styled-components";
import { BsThreeDots } from "react-icons/bs";
import { FaEarthAmericas, FaRegBookmark } from "react-icons/fa6";
import { IoCloseOutline } from "react-icons/io5";
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { FiShare } from "react-icons/fi";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Inner = styled.div`
  width: 1000px;
  height: 600px;
  padding: 27px 30px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius-08);
  position: relative;
  .icon {
    position: absolute;
    top: 20px;
    right: 20px;
    display: flex;
    gap: 10px;
    font-size: var(--font-size-paragraph);
  }
  @media screen and (max-width: 1050px) {
    width: 768px;
  }
`;

const PostInfo = styled.div`
  width: 200px;
  height: 50px;
  display: flex;
  align-items: center;
  gap: 14px;
  .profile {
    width: 44px;
    height: 44px;
    border-radius: 90%;
    background: var(--color-gray-02);
  }
  .info {
    display: flex;
    flex-direction: column;
    .name {
      font-size: var(--font-size-title-04);
      font-weight: var(--font-weight-bold);
    }
    .item {
      display: flex;
      gap: 5px;
      .clock {
        font-size: var(--font-size-subtitle);
      }
      .menuIcon {
        font-size: var(--font-size-subtitle);
      }
    }
  }
`;
const PostText = styled.div`
  margin-left: 63px;
`;

const ImgItem = styled.div`
  .postImg {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 10px;
    img {
      width: 100%;
      height: 370px;
      background: var(--color-gray-02);
      gap: 8px;
    }
  }
`;

const SocialBtnIcon = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 80px;
  padding: 10px 20px;
  font-size: var(--font-size-paragraph);
  border-top: 1px solid var(--color-light-gray-01);
  .socialIcon {
    cursor: pointer;
    display: flex;
    gap: 10px;
    &:hover {
      color: var(--color-facebookblue);
    }
  }
`;

const MainPost = () => {
  return (
    <Wrapper>
      <Inner>
        <div className="icon">
          <BsThreeDots />
          <IoCloseOutline />
        </div>
        <PostInfo>
          <div className="profile"></div>
          <div className="info">
            <div className="name">김정하</div>
            <div className="item">
              <span className="clock">1시간전</span>
              <span className="menuIcon">
                <FaEarthAmericas />
              </span>
            </div>
          </div>
        </PostInfo>
        <PostText>내 최애</PostText>
        <ImgItem>
          <div className="postImg">
            <img />
          </div>
        </ImgItem>
        <SocialBtnIcon>
          <div className="socialIcon">
            <FaRegHeart />
            좋아요
          </div>
          <div className="socialIcon">
            <FaRegComment />
            댓글
          </div>
          <div className="socialIcon">
            <FiShare />
            공유하기
          </div>
          <div className="socialIcon">
            <FaRegBookmark />
            저장하기
          </div>
        </SocialBtnIcon>
      </Inner>
    </Wrapper>
  );
};

export default MainPost;
