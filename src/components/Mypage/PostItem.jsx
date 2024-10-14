import React, { useState, useContext } from "react";
import styled from "styled-components";
import SocialBtnIcon from "../common/SocialBtnIcon.jsx";
import PostUpload from "../common/PostUpload.jsx";
import EditeBox from "../common/EditeBox.jsx";
import UploadModal from "../ModalConts/UploadModal.jsx";
import { DataStateContext } from "../../App.jsx";

// react-icon
import { BsThreeDots } from "react-icons/bs";
import { IoCloseOutline } from "react-icons/io5";
import { FaEarthAmericas } from "react-icons/fa6";

//font
import {
  MainTitle_22_b,
  SubTitle_16_b,
  SubDescription_16_n,
  SubDescription_14_n,
} from "../../styles/GlobalStyles.styles.js";

const Wrapper = styled.section`
  border-radius: var(--border-radius-30);
  padding-top: 20px;
  width: calc(100% - 90px);
  min-height: 350px;
  margin: 0 auto;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: var(--box-shadow-01);
  @media (max-width: 768px) {
    width: 90%;
    padding-top: 20px;
  }
`;
const Inner = styled.article`
  width: var(--inner-width-02);
  height: 100%;
  padding: 30px 90px;
  display: flex;
  flex-direction: column;
  align-content: space-between;
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
    margin-bottom: 20px;
  }
`;
const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 768px) {
    width: 100%;
    gap: 16px;
  }
  .profileImg {
    width: 60px;
    height: 60px;
    object-fit: cover;
    border-radius: 100px;
  }
  .profileName {
    ${MainTitle_22_b}
    @media (max-width: 768px) {
      ${SubTitle_16_b}
    }
  }
  .createdAt {
    ${SubDescription_14_n}
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    color: var(--color-gray-01);
    @media (max-width: 768px) {
      ${SubDescription_14_n}
    }
  }
`;
const ControlsIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0;
  font-size: 24px;
  cursor: pointer;
  transition: opacity 0.5s;
  *:hover {
    color: var(--color-facebookblue);
  }
  @media screen and (max-width: 768px) {
    position: absolute;
    right: 35px;
  }
`;
const EditeIcon = styled.div``;
const DeletIcon = styled.div`
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;
const Contents = styled.div`
  position: relative;
  padding: 30px 0;
  @media (max-width: 768px) {
    padding: 0;
    max-width: 100%;
  }
  .contentDesc {
    ${SubDescription_16_n};
    font-weight: normal;
    word-break: break-all;

    min-height: 70px;
    @media (max-width: 768px) {
      ${SubDescription_14_n}
      padding:0 4px;
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
`;
const ContImg = styled.img`
  margin-bottom: 30px;
  width: 100%;
  height: 350px;
  background: var(--color-light-gray-01);
  object-fit: cover;
  cursor: pointer;
  @media (max-width: 768px) {
    padding: 0;
    max-width: 100%;
    height: 200px;
  }
`;
const PostUploadFidle = styled.div``;

const PostItem = ({
  post,
  onDeletePost,
  handleModalContOpen,
  handleModalOpen,
}) => {
  const { currentUserData } = useContext(DataStateContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { id, userId, content, createdAt, image } = post;
  const isLiked = false; // 초기 좋아요 여부

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const postDeleteBtn = async (e) => {
    e.preventDefault();
    const isConfirmed = confirm("게시물을 삭제하시겠습니까?");
    if (isConfirmed) {
      try {
        await onDeletePost(id);
      } catch (err) {
        console.error("게시물 삭제 중 오류:", err);
      }
    }
  };

  const handleEdit = (postId) => {
    openEditModal(postId); // 수정할 게시물의 ID 전달
  };
  const openEditModal = (postId) => {
    if (confirm("게시물을 수정 하시겠습니까?")) {
      setIsEditing(true);
      setEditingPostId(postId);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingPostId(null);
  };

  return (
    <>
      <Wrapper>
        <Inner>
          <Profile>
            <ProfileContent>
              <img
                className="profileImg"
                src={currentUserData?.profileImage || "/img/defaultProfile.jpg"}
                alt="Profile"
              />
              <div className="profileText">
                <h1 className="profileName">
                  {currentUserData?.userName.firstName}
                  {currentUserData?.userName.lastName}
                </h1>
                <p className="createdAt">
                  {formatDate(post?.createdAt)}
                  <FaEarthAmericas
                    style={{
                      fontSize: "14px",
                      color: "black",
                      marginTop: "2px",
                    }}
                  />
                </p>
              </div>
            </ProfileContent>
            <ControlsIcon>
              <EditeIcon style={{ zIndex: 1 }}>
                <EditeBox
                  Title={<BsThreeDots />}
                  postId={post.id} // post의 ID 전달
                  handleEditBtn={handleEdit}
                />
              </EditeIcon>
              <DeletIcon>
                <IoCloseOutline onClick={postDeleteBtn} />
              </DeletIcon>
            </ControlsIcon>
          </Profile>
          <Contents>
            <div className="contentDesc">{post?.content}</div>
            {image && (
              <ContImg
                onClick={handleModalContOpen}
                src={image}
                alt="Post content image"
              />
            )}
          </Contents>
          <SocialBtnIcon post={post} />
          {/* <PostUploadFidle>
            <PostUpload />
          </PostUploadFidle> */}
        </Inner>
      </Wrapper>
      {isModalOpen && (
        <UploadModal
          userId={userId}
          postId={editingPostId} // 수정할 게시물의 ID를 전달
          imageSrc={image}
          contentDesc={content}
          createdAt={createdAt}
          closeModal={closeModal}
          isEditing={isEditing}
          currentUserData={currentUserData}
        />
      )}
    </>
  );
};

export default PostItem;
