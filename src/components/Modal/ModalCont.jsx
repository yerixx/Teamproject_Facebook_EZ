import React, { useState, useContext } from "react";
import { DataStateContext } from "../../App.jsx";
import { styled } from "styled-components";
import { collection, addDoc } from "firebase/firestore";
import SocialBtnIcon from "../common/SocialBtnIcon.jsx";
import { IoCloseOutline } from "react-icons/io5";
import { FaEarthAmericas } from "react-icons/fa6";
import defaultProfile from "/img/defaultProfile.jpg";
import {
  MainTitle_18_b,
  SubDescription_16_n,
  SubDescription_14_n,
} from "../../styles/GlobalStyles.styles.js";
import CommentSection from "../common/Comment.jsx";
import CommentUpload from "../common/CommentUpload.jsx";
import { db } from "../../firebase";
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
  background-color: ${(props) => props.theme.modalBgColor};
`;
const RightContent = styled.section`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  padding-top: 40px;
  gap: 20px;
  background-color: ${(props) => props.theme.bgColor};
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

const CloseIcon = styled.div`
  position: absolute;
  top: 33px;
  right: 30px;
  font-size: 25px;
  cursor: pointer;
  color: ${(props) => props.theme.textColor};
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
  border-radius: 8px;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 280px;
    object-fit: cover;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
    transition: transform 0.3s ease;
    &:hover {
      transform: scale(1.2);
    }
    @media screen and (max-width: 768px) {
      width: 100%;
      height: 300px;
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
    border-radius: 50%;
    @media screen and (max-width: 768px) {
      width: 60px;
      height: 60px;
    }
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      object-fit: cover;
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
    color: ${(props) => props.theme.textColor};
    @media screen and (max-width: 768px) {
      color: var(--color-white);
    }
  }
  .profiledesc {
    display: flex;
    gap: 4px;
    ${SubDescription_14_n}
    color: ${(props) => props.theme.textColor};

    * {
      color: ${(props) => props.theme.textColor};
    }
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
  color: ${(props) => props.theme.textColor};
  /* border: 1px solid #f00; */
  @media screen and (max-width: 1050px) {
    width: 100%;
    height: 100px;
    padding: 0;
    font-size: 14px;
  }

  p {
    word-wrap: keep-all;
    padding-bottom: 15px;
    @media screen and (max-width: 1050px) {
      padding: 20px;
      font-size: 14px;
      /* border-top: 1px solid #ccc; */
    }
  }
`;
const SocialIcon = styled.div`
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  .icon {
    flex: 1;
  }
  .list {
    height: 600px;
    flex: 1;
  }
  .upload {
    flex: 1;
    padding: 10px 0;
    width: 100%;
    background-color: ${(props) => props.theme.bgColor};
    position: absolute;
    bottom: 0;
  }
  @media (max-width: 768px) {
    //모바일 댓글
    position: absolute;
    width: 100%;
    height: ${({ $isCommentsOpen }) => ($isCommentsOpen ? "300px" : "60px")};
    overflow-y: auto;
    -ms-overflow-style: none;
    scrollbar-width: none;
    bottom: 0;
    font-size: 12px;
    padding-bottom: 10px;
    background-color: ${(props) => props.theme.ContainColor};
    border-radius: 8px 8px 0 0;
  }
`;

const StyledCommentSection = styled(CommentSection)`
  flex: 1;
  @media (max-width: 768px) {
    position: absolute;
    bottom: 60px; /* SocialIcon 높이에 맞춰 조정 */
    left: 0;
    width: 100%;
    max-height: 0;
    /* overflow: hidden; */
    transition: max-height 0.3s ease;
    ${({ $isModal }) =>
      $isModal &&
      `
      max-height: 200px;
    `}
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

const ModalCont = ({ post, closeModal }) => {
  const { currentUserData } = useContext(DataStateContext);
  const [showComments, setShowComments] = useState(false);

  const closeButton = () => {
    closeModal();
  };

  const handleCommentToggle = () => {
    setShowComments((prev) => !prev);
    console.log("showComments 상태:", showComments);
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const handleCreateComment = async (postId, content) => {
    if (!content.trim()) return;

    const formattedUserName = currentUserData?.userName
      ? `${currentUserData.userName.firstName}${currentUserData.userName.lastName}`
      : "Anonymous";

    const newComment = {
      content,
      formattedUserName,
      userId: currentUserData?.userId || "guest",
      createdAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, `posts/${postId}/comments`), newComment);
    } catch (error) {
      console.error("댓글 생성 중 오류 발생:", error);
    }
  };

  return (
    <Wrapper>
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
              <IoCloseOutline className="closeIcon" />
            </CloseIcon>
          </ControlsIcon>
          <ModalProfileImg>
            <img
              className="profileImg"
              src={post.profileImage || defaultProfile}
              alt="profile Image"
            />
            <ModalProfileSelf>
              <div className="profileName">{post.userName}</div>
              <div className="profiledesc">
                {formatDate(post.createdAt)}
                <FaEarthAmericas
                  style={{
                    color: "${(props) => props.theme.textColor}",
                    fontSize: "14px",
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
            <SocialBtnIcon
              className="icon"
              post={post}
              onCommentClick={handleCommentToggle}
            />
            {/* 댓글 작성 부분은 항상 표시 */}
            {/* 댓글 목록은 showComments 상태에 따라 표시 */}
            {showComments && (
              <StyledCommentSection
                className="list"
                post={post}
                showCommentUpload={false}
                $isModal={showComments}
              />
            )}
            <CommentUpload
              className="upload"
              postId={post.id}
              onCreateComment={(content) =>
                handleCreateComment(post.id, content)
              }
            />
          </SocialIcon>
        </RightContent>
      </DeskTop>
      {/* mobile */}
      <Mobile>
        <ControlsIcon>
          <CloseIcon onClick={closeButton}>
            <IoCloseOutline className="closeIcon" />
          </CloseIcon>
        </ControlsIcon>
        <ModalProfileImg>
          <img
            className="profileImg"
            src={post.profileImage || defaultProfile}
            alt="profile Image"
          />
          <ModalProfileSelf>
            <div className="profileName">{post.userName}</div>
            <div className="profiledesc">{formatDate(post.createdAt)}</div>
          </ModalProfileSelf>
        </ModalProfileImg>
        <ImageContent>
          <img src={post.image} />
        </ImageContent>
        <ModalDesc>
          <p>{post.content}</p>
        </ModalDesc>
        {/* 여기서 isCommentsOpen prop을 전달 */}
        <SocialIcon $isCommentsOpen={showComments}>
          <SocialBtnIcon
            className="SocialBtnIcon"
            post={post}
            onCommentClick={handleCommentToggle} // 댓글 토글 핸들러 전달
          />
        </SocialIcon>
        {/* 모바일에서 댓글 리스트 렌더링 추가 */}
        <StyledCommentSection
          className="mobile-comment-section"
          post={post}
          showCommentUpload={false}
          $isModal={showComments}
        />
        <CommentUpload
          className="mobile-upload"
          postId={post.id}
          onCreateComment={(content) => handleCreateComment(post.id, content)}
        />
      </Mobile>
    </Wrapper>
  );
};

export default ModalCont;
