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
  height: 4px;
  padding: 10px 20px;
  margin-bottom: 20px;
  background-color: ${(props) => props.theme.ContainColor};
  color: ${(props) => props.theme.iconColorB};
  & *:hover {
    color: var(--color-facebookblue) !important;
  }
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
    align-items: center;
    font-size: 20px;
    padding: 20px 20px 0px;
  }
  .socialIcon {
    ${SubDescription_16_n}
    color: ${(props) => props.theme.iconColorB};
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
    .socialIconText {
      width: 80px;
      @media (max-width: 768px) {
        display: none;
        font-size: 20px;
      }
    }
    @media (max-width: 768px) {
      justify-content: center;
      align-items: center;
      margin-top: 10px;
      font-size: 20px;
      &:last-child {
        margin-right: 0px;
      }
    }
  }
`;

const SocialBtnIcon = ({ post, onCommentClick }) => {
  const { currentUserData } = useContext(DataStateContext);
  const [toggle, setToggle] = useState(false);
  const [like, setLike] = useState(false);
  const [share, setShare] = useState(false);
  const [save, setSave] = useState(false);
  const [likes, setLikes] = useState(0); // likes 상태 추가

  useEffect(() => {
    // 초기 좋아요 수 설정
    if (Array.isArray(post?.likes)) {
      setLikes(post.likes.length); // 초기 좋아요 수 설정
      if (post.likes.includes(currentUserData?.userId)) {
        setLike(true);
      }
    }
    if (
      Array.isArray(currentUserData?.savedPosts) &&
      currentUserData.savedPosts.includes(post?.id)
    ) {
      setSave(true);
    }
  }, [post, currentUserData]);

  const handleLikeToggle = async () => {
    const postRef = doc(db, "posts", post.id);
    try {
      if (like) {
        await updateDoc(postRef, {
          likes: arrayRemove(currentUserData.userId),
        });
        setLikes((prev) => prev - 1);
      } else {
        await updateDoc(postRef, {
          likes: arrayUnion(currentUserData.userId),
        });
        setLikes((prev) => prev + 1);
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
  const handleCommentClick = () => {
    if (onCommentClick) {
      onCommentClick();
    } else {
      setToggle((prev) => !prev);
    }
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
          <div className="socialIconText">
            {like ? "좋아요" : "좋아요"} {likes > 0 ? likes : ""}
          </div>
        </div>
        <div onClick={handleCommentClick} className="socialIcon">
          <FaRegComment />
          <div className="socialIconText">댓글</div>
        </div>
        <div onClick={shareKakao} className="socialIcon">
          <FiShare />
          <div className="socialIconText">공유하기</div>
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
          <div className="socialIconText">저장하기</div>
        </div>
      </SocialIcon>
      {toggle && <CommentSection post={post} currentUser={currentUserData} />}
    </>
  );
};

export default SocialBtnIcon;
