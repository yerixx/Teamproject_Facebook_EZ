import React, { useState, useContext, useEffect } from "react";
import { DataDispatchContext, DataStateContext } from "../../App.jsx";

import styled from "styled-components";

import { BsArrowReturnLeft } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { CiEdit, CiCamera } from "react-icons/ci";
import { FiX } from "react-icons/fi";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase.js";
import defaultProfile from "/img/defaultProfile.jpg";

import {
  SubDescription_16_n,
  SubDescription_14_n,
} from "../../styles/GlobalStyles.styles.js";

// Styled-components
const WrapperForm = styled.form`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    height: 100%;
    padding: 0 20px;
  }
`;
const CommentCont = styled.div`
  width: var(--inner-width-02);
  display: flex;
  align-items: center;

  padding: 20px 50px;
  /* padding: 20px 10px; */
  @media (max-width: 768px) {
    width: 100%;
    padding: 0;

    &::placeholder {
      ${SubDescription_14_n}
    }
  }
  .commentUpLoadprofile {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .profileImg {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      object-fit: cover;
      @media (max-width: 768px) {
        display: none;
      }
    }
    .profileuploadText {
      ${SubDescription_16_n}
      width: 100%;
      height: 60px;
      margin: 0 15px;
      padding: 0 30px;
      background: ${(props) => props.theme.cardColor};
      border: 1px solid ${(props) => props.theme.cardColor};
      color: ${(props) => props.theme.iconColorB};
      border-radius: 50px;
      &:focus {
        outline: none;
      }
      @media (max-width: 768px) {
        margin: 0 10px;
        padding: 0 20px;
        height: 44px;
        &::placeholder {
          font-size: 13px;
        }
      }
    }
    .ciEdit,
    .submitBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 55px;
      height: 55px;
      background: ${(props) => props.theme.cardColor};
      color: ${(props) => props.theme.iconColorB};
      border: none;
      border-radius: 50px;
      cursor: pointer;
      @media (max-width: 768px) {
        width: 44px;
        height: 44px;
        padding: 12px;
      }
    }
    .submitBtn {
      padding: 0 21px;
      display: flex;
      margin-right: 15px;
      @media (max-width: 768px) {
        margin-right: 10px;
        padding: 0 14px;
      }
    }
    .ciEdit {
      padding: 16px;
      color: ${(props) => props.theme.iconColorB};
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    margin: 60px 0;
  }
`;
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
  z-index: 1000;
`;
const Inner = styled.div`
  width: 820px;
  padding: 30px 20px 50px;
  border-radius: 30px;
  box-shadow: var(--box-shadow-01);
  background-color: ${(props) => props.theme.bgColor};
  @media (max-width: 768px) {
    margin: 0 20px;
  }
`;
const ModalTitle = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 40px;
  margin-bottom: 15px;
  padding-bottom: 20px;
  font-size: 22px;
  color: ${(props) => props.theme.textColor};
  border-bottom: 1px solid var(--color-light-gray-01);
  @media (max-width: 768px) {
    font-size: 16px;
  }
  .title {
    font-weight: bold;
  }
  .xmark {
    width: 26px;
    height: 40px;
    display: flex;
    align-items: center;
    position: absolute;
    top: -10px;
    right: 20px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: var(--color-facebookblue);
    }
    @media (max-width: 768px) {
      top: -8px;
      font-size: 20px;
    }
  }
`;
const Posting = styled.div`
  padding: 0 60px;
  @media (max-width: 768px) {
    padding: 0 16px;
  }
  textarea {
    ${SubDescription_14_n}
    width: 100%;
    height: 100px;
    margin-bottom: 10px;
    padding: 14px 20px;
    border-radius: 8px;
    border: 1px solid ${(props) => props.theme.textareaColor};
    color: ${(props) => props.theme.textColor};
    background: ${(props) => props.theme.textareaColor};
    resize: none;
    @media (max-width: 768px) {
      font-size: 12px;
    }
    &:focus {
      outline: none;
    }
  }
`;
const PostingImg = styled.div`
  width: 100%;
  height: 360px;
  display: flex;
  justify-content: center;
  margin-bottom: 10px;
  position: relative;
  @media (max-width: 768px) {
    height: fit-content;
  }
  .deletIcon {
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.2);
    padding: 5px 8px 4px;
    color: #fff;
    font-size: 20px;

    cursor: pointer;
  }
  img {
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
    @media (max-width: 768px) {
      height: 200px;
    }
  }
`;
const PostingBtn = styled.button`
  width: 100%;
  height: 55px;
  border-radius: 8px;
  border: none;
  font-size: 18px;
  font-weight: bold;
  color: var(--color-white);
  background: ${(props) =>
    props.disabled ? "#ccc" : "var(--color-facebookblue)"};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  transition: opacity 0.3s;
  &:hover {
    opacity: 0.8;
  }
  @media (max-width: 768px) {
    font-size: 16px;
    height: 40px;
  }
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .info {
    font-size: 16px;
    font-weight: bold;
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 15px;
    .profileImg {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      object-fit: cover;
    }
    .profilename {
      color: ${(props) => props.theme.textColor};
    }
  }
  .camera {
    font-size: 30px;
    border-radius: 50%;
    color: ${(props) => props.theme.iconColorB};
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      border-radius: 50%;
      color: var(--color-facebookblue);
    }
  }
`;

const PostUpload = ({ placeholder }) => {
  const { onCreatePost } = useContext(DataDispatchContext);
  const { currentUserData } = useContext(DataStateContext);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadText, setUploadText] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewImg, setPreviewImg] = useState(null);

  useEffect(() => {
    let imageUrl;
    if (uploadFile) {
      imageUrl = URL.createObjectURL(uploadFile);
      setPreviewImg(imageUrl);
    }
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [uploadFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!uploadFile && !uploadText) {
      alert("내용을 입력해주세요");
      return;
    }
    setIsLoading(true);
    let imageUrl = null;

    if (uploadFile) {
      try {
        imageUrl = await uploadImage(uploadFile);
      } catch (error) {
        console.error("이미지 업로드 실패:", error);
        setIsLoading(false);
        return;
      }
    }

    try {
      await onCreatePost(
        currentUserData.userId,
        `${currentUserData.userName.firstName}${currentUserData.userName.lastName}`,
        uploadText,
        imageUrl
      );
      setUploadText("");
      setUploadFile(null);
      closeModal();
      alert("게시물 업로드가 완료됐습니다");
    } catch (err) {
      console.error("게시물 업로드 중 오류:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (file) => {
    try {
      const storageRef = ref(storage, `images/${file.name}-${Date.now()}`);
      await uploadBytes(storageRef, file);
      return await getDownloadURL(storageRef);
    } catch (err) {
      console.error("이미지 업로드 오류:", err);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setUploadFile(null);
    setUploadText("");
    setIsModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size <= 50 * 1024 * 1024) {
        setUploadFile(file);
      } else {
        alert("업로드할 수 있는 파일의 최대 크기는 50MB입니다");
      }
    }
  };

  const handleCheck = (e) => {
    if (e) {
      confirm("게시물을 작성 하겠습니까?");
    }
  };
  const closeImgOpen = () => {
    if (previewImg) {
      URL.revokeObjectURL(previewImg);
    }
    setUploadFile(null);
    setPreviewImg(null);
  };
  return (
    <WrapperForm onSubmit={handleSubmit}>
      <CommentCont>
        <div className="commentUpLoadprofile">
          <div className="profileImgWrap">
            <img
              className="profileImg"
              src={currentUserData?.profileImage || "/img/defaultProfile.jpg"}
              alt="Profile"
            />
          </div>
          <input
            className="profileuploadText"
            type="text"
            id="text"
            name="text"
            value={uploadText}
            placeholder={placeholder || "댓글을 입력하세요"}
            required
            onChange={(e) => setUploadText(e.target.value)}
          />
          <button
            onClick={handleCheck}
            disabled={isLoading}
            type="submit"
            className="submitBtn"
          >
            {isLoading ? <FaSpinner /> : <BsArrowReturnLeft />}
          </button>
          <div>
            <CiEdit className="ciEdit" onClick={openModal} />
          </div>
        </div>
      </CommentCont>
      {isModalOpen && (
        <Wrapper>
          <Inner>
            <ModalTitle>
              <div className="title">게시물 올리기</div>
              <div className="xmark" onClick={closeModal}>
                <FiX />
              </div>
            </ModalTitle>
            <Posting>
              <InfoItem>
                <div className="info">
                  <img
                    className="profileImg"
                    src={currentUserData.profileImage || defaultProfile}
                    alt="profile Image"
                  ></img>
                  <div className="profilename">
                    {currentUserData
                      ? `${currentUserData.userName.firstName}${currentUserData.userName.lastName}`
                      : "사용자"}
                  </div>
                </div>
                <label htmlFor="upload-image">
                  <CiCamera
                    className="camera"
                    style={{
                      cursor: "pointer",
                      fontSize: "30px",
                    }}
                  />
                </label>
              </InfoItem>
              <textarea
                value={uploadText}
                onChange={(e) => setUploadText(e.target.value)}
                placeholder="오늘 어떤일이 있으셨나요?"
                required
              />
              {previewImg && (
                <PostingImg type="button" disabled={isLoading}>
                  <div className="deletIcon" onClick={closeImgOpen}>
                    <FiX />
                  </div>
                  <img src={previewImg} alt="게시물 이미지" />
                </PostingImg>
              )}
              <input
                type="file"
                id="upload-image"
                name="upload-image"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <PostingBtn
                onClick={handleSubmit}
                disabled={isLoading || (!uploadText && !uploadFile)}
              >
                {isLoading ? "게시 중..." : "게시하기"}
              </PostingBtn>
            </Posting>
          </Inner>
        </Wrapper>
      )}
    </WrapperForm>
  );
};

export default PostUpload;
