import React, { useState, useContext } from "react";
import { DataDispatchContext } from "../../App";

import { storage } from "../../firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { CiCamera } from "react-icons/ci";

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
  width: 900px;
  padding: 50px 20px;
  border-radius: 30px;
  box-shadow: var(--box-shadow-01);
  background-color: var(--color-white);
`;
const ModalTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 26px;
  border-bottom: 1px solid var(--color-light-gray-01);
  height: 60px;
  position: relative;
  margin-bottom: 15px;
  .title {
    font-weight: bold;
  }
  .xmark {
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    position: absolute;
    top: 17px;
    right: 20px;
    cursor: pointer;
    transition: color 0.3s;
    &:hover {
      color: var(--color-facebookblue);
    }
  }
`;
const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 60px;
  align-items: center;
  .info {
    font-size: 16px;
    font-weight: bold;
    display: flex;
    gap: 10px;
    align-items: center;
    margin-bottom: 15px;
    .profile {
      background: var(--color-gray-01);
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
    }
    .profilename {
      color: var(--color-gray-01);
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
      /* background: var(--color-facebookblue);
      color: var(--color-white); */
    }
  }
`;

const Posting = styled.div`
  padding: 0 60px;
  textarea {
    width: 100%;
    height: 100px;
    border-radius: 8px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    resize: vertical;
    margin-bottom: 20px;
    resize: none;
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
`;

const UploadModal = ({ onClose, onSubmit }) => {
  const { onCreatePost } = useContext(DataDispatchContext);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadText, setUploadText] = useState("");
  const [uploadFile, setUploadFile] = useState(null);

  // 이미지 파일이 변경될 때 호출되는 함수
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadFile(file);
    }
  };

  // Firebase Storage에 이미지 업로드하는 함수
  const uploadImage = async (file) => {
    try {
      const storageRef = ref(storage, `images/${file.name}-${Date.now()}`); // 고유한 파일 이름 생성
      await uploadBytes(storageRef, file); // 파일을 Firebase Storage에 업로드
      const downloadURL = await getDownloadURL(storageRef); // 업로드한 파일의 URL 가져오기
      return downloadURL;
    } catch (err) {
      console.error("이미지 업로드 중 오류 발생:", err);
      throw new Error("이미지 업로드 실패");
    }
  };

  // 폼 제출 처리 함수
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    let imageUrl = null;

    // 이미지가 있으면 업로드 후 URL 가져오기
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
      if (uploadText === "" || uploadText === null) {
        alert("내용을 입력해주세요");
        setIsLoading(false);
        return;
      }
      // Firestore에 게시물 추가
      await onCreatePost("testUserId", "TestUser", uploadText, imageUrl);
      // 성공 후 모달 닫기 및 입력 필드 초기화
      onSubmit({ text: uploadText, image: imageUrl });
      setUploadText("");
      setUploadFile(null);
    } catch (err) {
      console.error("게시물 업로드 중 오류:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <Inner>
        <ModalTitle>
          <div className="title">게시물 올리기</div>
          <div className="xmark" onClick={onClose}>
            <FiX />
          </div>
        </ModalTitle>
        <InfoItem>
          <div className="info">
            <div className="profile"></div>
            <div className="profilename">김정하</div>
          </div>
          <div className="camera">
            <label htmlFor="modal-camera-input">
              <CiCamera style={{ cursor: "pointer" }} />
            </label>
            <input
              id="modal-camera-input"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </InfoItem>
        <Posting>
          <textarea
            value={uploadText}
            onChange={(e) => setUploadText(e.target.value)}
            placeholder="오늘 어떤일이 있으셨나요?"
            required
          />
          {uploadFile && (
            <PostingImg>
              <img src={URL.createObjectURL(uploadFile)} alt="게시물 이미지" />
            </PostingImg>
          )}
          <PostingBtn onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "게시 중..." : "게시하기"}
          </PostingBtn>
        </Posting>
      </Inner>
    </Wrapper>
  );
};

export default UploadModal;
