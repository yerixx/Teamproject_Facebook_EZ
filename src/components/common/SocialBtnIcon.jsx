import React, { useState, useContext } from "react";
import { DataDispatchContext, DataStateContext } from "../../App.jsx";

import styled from "styled-components";

import {
  MainTitle_18_n,
  SubDescription_16_n,
} from "../../styles/GlobalStyles.styles.js";

// react-icon
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FiShare } from "react-icons/fi";
import CommentSection from "./Comment.jsx";
import Kakao from "./kakao.jsx";

const SocialIcon = styled.div`
  ${MainTitle_18_n}
  display:flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 0 10px 20px;
  border-bottom: 1px solid var(--color-light-gray-01);
  color: ${(props) => props.theme.textColor};
  /* margin-bottom: 20px; */
  .socialIcon {
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
    @media (max-width: 768px) {
      width: 50%;
      justify-content: center;
      margin-right: 20px;
      font-size: 20px;
      &:last-child {
        margin-right: 0px;
      }
    }

    &:hover > svg {
      color: var(--color-facebookblue);
    }

    .socialIconText {
      ${SubDescription_16_n}
      color: ${(props) => props.theme.textColor};
      @media (max-width: 768px) {
        display: none;
      }
    }
  }
`;

const SocialBtnIcon = ({ post }) => {
  const { onToggleLike } = useContext(DataDispatchContext);
  const currentUser = useContext(DataStateContext);
  console.log(currentUser);
  const [toggle, setToggle] = useState(false);
  const [like, setLike] = useState(false);
  const [share, setShare] = useState(false);
  const [save, setSave] = useState(false);
  const handleCommentToggle = () => setToggle((prev) => !prev);
  const handleLikeToggle = async (e) => {
    e.preventDefault();
    try {
      await onToggleLike(post.id, like);
      setLike((prev) => !prev);
    } catch (err) {
      console.error("Like error", err);
    }
  };
  const shareKakao = () => {
    setShare((prev) => !prev);
  };
  if (!post) {
    return <p>Loading...</p>; // 데이터가 로드되지 않은 상태 처리
  }

  return (
    <>
      <SocialIcon>
        <div
          onClick={handleLikeToggle}
          style={{
            color: !like
              ? "${(props) => props.theme.textColor}"
              : "var(--color-facebookblue)",
          }}
          className="socialIcon"
        >
          <FaRegHeart />
          <div className="socialIconText">좋아요</div>
        </div>
        <div onClick={handleCommentToggle} className="socialIcon">
          <FaRegComment />
          <div className="socialIconText">댓글</div>
        </div>
        <div className="socialIcon">
          <FiShare />
          <div onClick={shareKakao} className="socialIconText">
            공유하기
          </div>
          {share ? <Kakao shareKakao={shareKakao} /> : ""}
        </div>
        <div
          // onClick={handlSaveToggle}
          style={{
            color: !save
              ? "${(props) => props.theme.textColor}"
              : "var(--color-facebookblue)",
          }}
          className="socialIcon"
        >
          <FaRegBookmark />
          <div className="socialIconText">저장하기</div>
        </div>
      </SocialIcon>
      {toggle && <CommentSection post={post} currentUser={currentUser} />}
    </>
  );
};

export default SocialBtnIcon;
