import React, { useState, useContext } from "react";
import { DataDispatchContext } from "../../App.jsx";

import styled from "styled-components";
import { SubDescription_16_n } from "../../styles/GlobalStyles.styles.js";

import { CiCamera } from "react-icons/ci";
import { FiX } from "react-icons/fi";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";

// Styled-components
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
  background-color: var(--color-white);
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
  font-size: 22px;
  margin-bottom: 15px;
  padding-bottom: 20px;
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
    width: 100%;
    height: 100px;
    border-radius: 8px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
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
  width: 740px;
  height: 360px;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  img {
    width: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;
const PostingBtn = styled.button`
  background: var(--color-facebookblue);
  width: 100%;
  height: 55px;
  border-radius: 8px;
  border: none;
  font-size: 20px;
  font-weight: bold;
  color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
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
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
  }
  .camera {
    padding: 4px 10px;
    font-size: 30px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      padding: 4px 10px;
      border-radius: 50%;
      color: var(--color-facebookblue);
    }
  }
`;

const UploadModal = ({
  closeModal,
  postId,
  imageSrc,
  contentDesc,
  onDeletePost,
  createdAt,
  isEditing,
}) => {
  const { onCreatePost } = useContext(DataDispatchContext);
  const [isLoading, setIsLoading] = useState(false);
  // const [isEditing, setIsEditing] = useState(false);
  const [uploadText, setUploadText] = useState("");
  const [uploadFile, setUploadFile] = useState(null);

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
      // 여기에서 content에는 업로드된 텍스트를, image에는 이미지 URL을 전달
      await onCreatePost("testUserId", "TestUser", uploadText, imageUrl);
      setUploadText("");
      setUploadFile(null);
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
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file.size <= 5 * 1024 * 1024) {
      setUploadFile(file);
    } else {
      alert("업로드할 수 있는 파일의 최대 크기는 5MB입니다");
    }
  };

  return (
    <Wrapper>
      <Inner>
        <ModalTitle>
          <div className="title">
            {isEditing ? "게시물 수정하기" : "게시물 올리기"}
          </div>
          <div className="xmark" onClick={closeModal}>
            <FiX />
          </div>
        </ModalTitle>
        <Posting>
          <InfoItem>
            <div className="info">
              <img
                className="profileImg"
                src={imageSrc}
                alt="profile Image"
              ></img>
              <div className="profilename">박예림</div>
            </div>
            <label htmlFor="upload-image">
              <CiCamera style={{ cursor: "pointer", fontSize: "30px" }} />
            </label>
          </InfoItem>
          <textarea
            value={isEditing ? contentDesc : uploadText}
            onChange={(e) => setUploadText(e.target.value)}
            placeholder={isEditing ? contentDesc : "오늘 어떤일이 있으셨나요?"}
            required
          />
          {uploadFile && (
            <PostingImg>
              <img src={URL.createObjectURL(uploadFile)} alt="게시물 이미지" />
            </PostingImg>
          )}
          <input
            id="upload-image"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
          <PostingBtn onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "게시 중..." : "게시하기"}
          </PostingBtn>
        </Posting>
      </Inner>
      {/* {isEditing && (
        <Inner>
          <ModalTitle>
            <div className="title">게시물 수정하기</div>
            <div className="xmark" onClick={closeModal}>
              <FiX />
            </div>
          </ModalTitle>
          <Posting>
            <InfoItem>
              <div className="info">
                <div className="profile"></div>
                <div className="profilename">박예림</div>
              </div>
              <label htmlFor="upload-image">
                <CiCamera style={{ cursor: "pointer", fontSize: "30px" }} />
              </label>
            </InfoItem>
            <textarea
              value={contentDesc}
              onChange={(e) => setUploadText(e.target.value)}
              placeholder={contentDesc}
              required
            />
            {uploadFile && (
              <PostingImg>
                <img
                  src={URL.createObjectURL(uploadFile)}
                  alt="게시물 이미지"
                />
              </PostingImg>
            )}
            <input
              id="upload-image"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
            <PostingBtn onClick={handleSubmit} disabled={isLoading}>
              {isLoading ? "게시 중..." : "게시하기"}
            </PostingBtn>
          </Posting>
        </Inner>
      )} */}
    </Wrapper>
  );
};

export default UploadModal;
