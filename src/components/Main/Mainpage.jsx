import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SocialBtnIcon from "../common/SocialBtnIcon.jsx";
import PostUpload from "../common/PostUpload.jsx";
import EditeBox from "../common/EditeBox.jsx";

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
import { DataDispatchContext, DataStateContext } from "../../App.jsx";
import Mainlive from "./Mainlive.jsx";
import UploadModal from "../ModalConts/UploadModal.jsx";
import CommentUpload from "../common/CommentUpload";
import CommentList from "../common/CommentList";

const Wrapper = styled.section`
  border-radius: var(--border-radius-30);
  padding-top: 50px;
  width: 900px;
  min-height: 400px;
  /* margin: 0 auto; */
  /* height: fit-content; */
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: var(--box-shadow-01);
  background-color: ${(props) => props.theme.ContainColor};
  @media (max-width: 768px) {
    width: 90%;
    padding-top: 20px;
  }
`;
const Inner = styled.article`
  width: var(--inner-width-02);
  height: 100%;
  padding: 0 90px;
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
    background: var(--color-gray-01);
    border-radius: 100px;
  }
  .profileName {
    color: ${(props) => props.theme.textColor};
    ${MainTitle_22_b}
    @media (max-width: 768px) {
      ${SubTitle_16_b}
    }
  }
  .createdAt {
    color: ${(props) => props.theme.subTextColor};
    ${SubDescription_16_n}
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    @media (max-width: 768px) {
      ${SubDescription_14_n}
    }
  }
`;
const ControlsIcon = styled.div`
  display: flex;
  gap: 0;
  font-size: 24px;

  cursor: pointer;
  transition: opacity 0.5s;
  *:hover {
    color: var(--color-facebookblue);
  }
`;
const EditeIcon = styled.div`
  color: ${(props) => props.theme.textColor};
`;
const DeletIcon = styled.div`
  color: ${(props) => props.theme.textColor};
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
    color: ${(props) => props.theme.textColor};
    font-weight: normal;
    word-break: break-all;
    margin-bottom: 30px;
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
    color: ${(props) => props.theme.textColor};
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
  @media (max-width: 768px) {
    padding: 0;
    max-width: 100%;
    height: 200px;
  }
`;

const Mainpage = ({ searchTerm }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 여부
  const [imageSrc, setImageSrc] = useState(""); // 편집할 이미지 소스
  const [contentDesc, setContentDesc] = useState(""); // 편집할 내용
  const isLiked = false; // 초기 좋아요 여부
  const [posts, setPosts] = useState([]);

  const [editingPostId, setEditingPostId] = useState(null);
  const { onDeletePost } = useContext(DataDispatchContext);
  const data = useContext(DataStateContext);
  const { currentUserData } = data;
  const postData = data.posts || [];
  const lastPostRef = useRef(null);

  useEffect(() => {
    const sortedPosts = [...postData].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA; // 최신순 정렬
    });
    setPosts(sortedPosts);
  }, [postData]);

  const normalizeString = (str) => str.replace(/\s+/g, "").toLowerCase();

  const filteredPosts = posts.filter(
    (post) =>
      normalizeString(post.content).includes(normalizeString(searchTerm)) ||
      normalizeString(post.userName).includes(normalizeString(searchTerm))
  );

  useEffect(() => {
    if (filteredPosts.length === 1 && lastPostRef.current) {
      lastPostRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [filteredPosts]);

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  const postDeleteBtn = async (e, postId) => {
    e.preventDefault();
    const isConfirmed = confirm("게시물을 삭제하시겠습니까?");
    if (isConfirmed) {
      try {
        await onDeletePost(postId); // 삭제 함수 호출
      } catch (err) {
        console.error("게시물 삭제 중 오류:", err);
      }
    }
  };
  const handleEditBtn = (postId, image, content) => {
    console.log(`Edit button clicked for postId: ${postId}`);
    setEditingPostId(postId);
    setImageSrc(image || "");
    setContentDesc(content || "");
    setIsEditing(true);
    setIsModalOpen(true);
    console.log("isModalOpen after setState:", isModalOpen); // 이 로그는 이전 상태를 출력할 수 있음
  };
  useEffect(() => {
    console.log("isModalOpen changed:", isModalOpen);
  }, [isModalOpen]);
  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingPostId(null);
    setImageSrc("");
    setContentDesc("");
  };
  const handleUpdatePost = async (postId, updatedContent) => {
    try {
      await onUpdatePost(postId, { content: updatedContent });
      setIsModalOpen(false); // 모달 닫기
      setEditingPostId(null);
      console.log("게시물이 성공적으로 수정되었습니다");
    } catch (error) {
      console.error("게시물 업데이트 중 오류 발생:", error);
    }
  };
  console.log(filteredPosts);

  const isSearching = searchTerm.trim().length > 0;
  return (
    <>
      {filteredPosts.length > 0 ? (
        filteredPosts.map((item, i) => {
          const isAuthor = currentUserData?.userId === item.userId;
          return (
            <React.Fragment key={i}>
              <Wrapper>
                <Inner>
                  <Profile>
                    <ProfileContent>
                      <div className="profileImg"></div>
                      <div className="profileText">
                        <h1 className="profileName">{item.userName}</h1>
                        <p className="createdAt">
                          {formatDate(item.createdAt)}
                        </p>
                      </div>
                    </ProfileContent>
                    {isAuthor && (
                      <ControlsIcon>
                        <EditeIcon>
                          <EditeBox
                            postId={item.id}
                            imageSrc={item.image}
                            contentDesc={item.content}
                            handleEditBtn={handleEditBtn}
                            Title={<BsThreeDots />}
                          />
                        </EditeIcon>
                        <DeletIcon>
                          <IoCloseOutline
                            onClick={(e) => postDeleteBtn(e, item.id)}
                          />
                        </DeletIcon>
                      </ControlsIcon>
                    )}
                  </Profile>
                  <Contents>
                    <div className="contentDesc">{item.content}</div>
                    {item.image && (
                      <ContImg src={item.image} alt="Post content" />
                    )}
                  </Contents>
                  <SocialBtnIcon
                    postId={item.id}
                    comments={item.comments || []}
                  />
                  {/* <CommentUpload /> */}
                </Inner>
              </Wrapper>
              {!isSearching && (i + 1) % 3 === 0 && <Mainlive />}
            </React.Fragment>
          );
        })
      ) : (
        <p>검색된 게시물이 없습니다.</p>
      )}

      {isModalOpen && (
        <UploadModal
          closeModal={closeModal}
          postId={editingPostId}
          imageSrc={imageSrc}
          contentDesc={contentDesc}
          isEditing={isEditing}
          currentUserData={currentUserData}
        />
      )}
    </>
  );
};

export default Mainpage;
