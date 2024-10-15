import React, { useState, useContext, useEffect } from "react";
import { DataDispatchContext, DataStateContext } from "../../App.jsx";
import styled from "styled-components";
import CommentSection from "./Comment.jsx";
import { db } from "../../firebase"; // 파이어베이스 DB 사용
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

import {
  MainTitle_18_n,
  SubDescription_16_n,
} from "../../styles/GlobalStyles.styles.js";

// react-icon
import { FaRegHeart, FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FiShare } from "react-icons/fi";
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

  & *:hover {
    color: var(--color-facebookblue) !important;
  }
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
  const { currentUserData } = useContext(DataStateContext);
  const [toggle, setToggle] = useState(false);
  const [like, setLike] = useState(false);
  const [share, setShare] = useState(false);
  const [save, setSave] = useState(false);

  const likes = Array.isArray(post?.likes) ? post.likes.length : 0;

  // 포스트에 이미 좋아요를 눌렀는지 확인
  useEffect(() => {
    if (
      Array.isArray(post?.likes) &&
      post.likes.includes(currentUserData?.userId)
    ) {
      setLike(true);
    }
    if (
      Array.isArray(currentUserData?.savedPosts) &&
      currentUserData.savedPosts.includes(post?.id)
    ) {
      setSave(true);
    }
  }, [post, currentUserData]);

  const handleCommentToggle = () => setToggle((prev) => !prev);

  const handleLikeToggle = async () => {
    const postRef = doc(db, "posts", post.id);

    try {
      if (like) {
        await updateDoc(postRef, {
          likes: arrayRemove(currentUserData.userId),
        });
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(currentUserData.userId),
        });
      }
      setLike((prev) => !prev);
    } catch (err) {
      console.error("Like error", err);
    }
  };
  const shareKakao = (e) => {
    e.stopPropagation();
    setShare((prev) => !prev);
  };
  const handleSaveToggle = async () => {
    const userRef = doc(db, "users", currentUserData.userId);

    try {
      if (save) {
        await updateDoc(userRef, {
          savedPosts: arrayRemove(post?.id),
        });
      } else {
        await updateDoc(userRef, {
          savedPosts: arrayUnion(post?.id),
        });
      }
      setSave((prev) => !prev);
    } catch (err) {
      console.error("Save error", err);
    }
  };

  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었어요.");
    } catch (err) {
      console.log(err);
    }
  };

  // post가 없을 때 안전하게 렌더링 처리
  if (!post) return null;

  return (
    <>
      <SocialIcon>
        <div
          onClick={handleLikeToggle}
          style={{
            color: like ? "var(--color-facebookblue)" : "inherit",
          }}
          className="socialIcon"
        >
          <FaRegHeart />
          <div
            style={{
              color: like ? "var(--color-facebookblue)" : "inherit",
            }}
            className="socialIconText"
          >
            좋아요
          </div>
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
          {share ? <Kakao shareKakao={shareKakao} /> : null}
        </div>
        <div
          onClick={handleSaveToggle}
          style={{
            color: save ? "var(--color-facebookblue)" : "inherit",
          }}
          className="socialIcon"
        >
          <FaRegBookmark />
          <div
            style={{
              color: save ? "var(--color-facebookblue)" : "inherit",
            }}
            className="socialIconText"
          >
            저장하기
          </div>
        </div>
      </SocialIcon>
      {toggle && <CommentSection post={post} currentUser={currentUserData} />}
    </>
  );
};

export default SocialBtnIcon;
