import React, { useState, useContext } from "react";
import { DataDispatchContext } from "../../App.jsx";
import UploadModal from "../common/UploadModal.jsx";

import styled from "styled-components";
import { SubDescription_16_n } from "../../styles/GlobalStyles.styles.js";
import { BsArrowReturnLeft } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import testCat from "/img/testcat.jpg";

// Styled-components
const WrapperForm = styled.form`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    margin: 16px 0;
    height: 150px;
  }
`;
const CommentCont = styled.div`
  width: var(--inner-width-02);
  display: flex;
  align-items: center;
  padding: 70px 60px;
  @media (max-width: 768px) {
    margin: 0 10px;
    padding: 0;
    height: 100px;
  }
  .commentUpLoadprofile {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .profileImg {
      width: 60px;
      height: 60px;
      background: var(--color-light-gray-01);
      border-radius: 100px;
      @media (max-width: 768px) {
        width: 40px;
        height: 40px;
        object-fit: cover;
      }
    }
    .profileuploadText {
      ${SubDescription_16_n}
      width: 100%;
      height: 60px;
      margin: 0 15px;
      padding: 0 30px;
      background: var(--color-light-gray-01);
      color: var(--color-gray-01);
      border: none;
      border-radius: 50px;
      &:focus {
        outline: none;
      }
      @media (max-width: 768px) {
        margin: 0 10px;
        padding: 0 20px;
        height: 44px;
      }
    }
    .ciEdit,
    .submitBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 55px;
      height: 55px;
      background: var(--color-light-gray-01);
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
    }
  }
  @media (max-width: 768px) {
    width: 100%;
    margin: 60px 0;
  }
`;

const UploadField = ({ placeholder }) => {
  const { onCreatePost } = useContext(DataDispatchContext);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadText, setUploadText] = useState("");
  const [uploadFile, setUploadFile] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false); // 모달 닫기
    setIsEditing(false); // 수정 모드 해제
  };
  const handleCheck = (e) => {
    if (e) {
      confirm("게시물을 작성 하겠습니까?");
    }
  };

  return (
    <WrapperForm onSubmit={handleSubmit}>
      <CommentCont>
        <div className="commentUpLoadprofile">
          <img src={testCat} className="profileImg" alt="profileImg" />
          <input
            className="profileuploadText"
            onChange={(e) => setUploadText(e.target.value)}
            type="text"
            placeholder={placeholder || "댓글을 입력하세요"}
            value={uploadText}
            required
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
      {isModalOpen && <UploadModal closeModal={closeModal} />}
    </WrapperForm>
  );
};

export default UploadField;
