import React, { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import SocialBtnIcon from "../common/SocialBtnIcon.jsx";
import { DataDispatchContext, DataStateContext } from "../../App.jsx";
import Mainlive from "./Mainlive.jsx";
import ModalCont from "../Modal/ModalCont.jsx";
import UploadModal from "../ModalConts/UploadModal.jsx";

import defaultProfile from "/img/defaultProfile.jpg";

// react-icon
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
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;
  /* margin: 0 auto; */
  padding-top: 20px;
  border-radius: var(--border-radius-30);
  background-color: ${(props) => props.theme.ContainColor};
  box-shadow: var(--box-shadow-01);
  @media screen and (max-width: 1050px) {
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 90vw;
    min-width: 360px;
    padding-top: 10px;
    left: 0;
  }
`;
const Inner = styled.article`
  width: var(--inner-width-02);
  height: 100%;
  padding: 20px 36px 30px;
  display: flex;
  flex-direction: column;
  align-content: space-between;
  @media (max-width: 768px) {
    border-radius: var(--border-radius-08);
    padding: 20px 30px;
    min-width: 360px;
    height: 80%;
    /* margin: 0 auto; */
  }
`;
const Profile = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;
const ProfileContent = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 768px) {
    gap: 16px;
  }
  .profileImg {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    object-fit: cover;
    border-radius: 100px;
    @media (max-width: 768px) {
      width: 48px;
      height: 48px;
    }
  }
  .profileName {
    ${MainTitle_22_b}
    color: ${(props) => props.theme.textColor};
    @media (max-width: 768px) {
      ${SubTitle_16_b}
    }
  }
  .createdAt {
    ${SubDescription_14_n}
    color: ${(props) => props.theme.textColor};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    * {
      color: ${(props) => props.theme.textColor};
    }
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
`;

const DeletIcon = styled.div`
  color: ${(props) => props.theme.textColor};
  @media (max-width: 768px) {
    font-size: 24px;
  }
`;
const Contents = styled.div`
  position: relative;
  padding: 20px 0;
  @media (max-width: 768px) {
    padding: 0;
    max-width: 100%;
  }
  .contentDesc {
    ${SubDescription_16_n};
    color: ${(props) => props.theme.textColor};
    font-weight: normal;
    word-break: break-all;
    min-height: 50px;
    @media (max-width: 768px) {
      ${SubDescription_14_n}
      padding:0 4px;
      min-height: 30px;
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
  width: 100%;
  height: 350px;
  background: var(--color-light-gray-01);
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  @media (max-width: 768px) {
    padding: 0;
    max-width: 100%;
    height: 200px;
  }
`;

const Mainpage = ({ searchTerm }) => {
  const [isContOpen, setIsContOpen] = useState(false);
  const [postedCont, setPostedCont] = useState(null);

  const [profileImg, setProfileImg] = useState(defaultProfile);
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 열림 상태
  const [isEditing, setIsEditing] = useState(false); // 편집 모드 여부
  const [imageSrc, setImageSrc] = useState(""); // 편집할 이미지 소스
  const [contentDesc, setContentDesc] = useState(""); // 편집할 내용
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
        await onDeletePost(postId);
      } catch (err) {
        console.error("게시물 삭제 중 오류:", err);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setEditingPostId(null);
    setImageSrc("");
    setContentDesc("");
  };

  const handleImageClick = (post) => {
    setPostedCont(post); // 클릭한 게시물의 정보를 저장
    setIsContOpen(true); // 모달 열기
  };

  const handleModalContClose = () => {
    setPostedCont(null);
    setIsContOpen(false);
  };

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
                      <img
                        className="profileImg"
                        src={item.profileImage || defaultProfile}
                        alt="Profile"
                      />
                      <div className="profileText">
                        <h1 className="profileName">{item.userName}</h1>
                        <p className="createdAt">
                          {formatDate(item.createdAt)}
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
                    {isAuthor && (
                      <ControlsIcon>
                        <DeletIcon>
                          <IoCloseOutline
                            onClick={(e) => postDeleteBtn(e, item.id)}
                          />
                        </DeletIcon>
                      </ControlsIcon>
                    )}
                  </Profile>
                  <Contents>
                    {item.content ? (
                      <div className="contentDesc">{item.content}</div>
                    ) : null}
                    {item.image && (
                      <ContImg
                        onClick={() => handleImageClick(item)}
                        src={item.image}
                        alt="Post content"
                      />
                    )}
                  </Contents>
                  <SocialBtnIcon post={item} />
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

      {isContOpen && (
        <ModalCont post={postedCont} closeModal={handleModalContClose} />
      )}
    </>
  );
};

export default Mainpage;
