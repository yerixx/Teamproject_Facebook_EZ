import React, { useState, useContext } from "react";
import { DataDispatchContext } from "../../App.jsx";

import Mainmodal from "./UploadModal.jsx";
import "../../styles/loadingSpearTest.css"; // 로딩스피너 테스트
import testCat from "/img/testcat.jpg";

import styled from "styled-components";
import {
  MainTitle_18_n,
  SubDescription_16_n,
} from "../../styles/GlobalStyles.styles.js";

// react-icons
import { BsArrowReturnLeft } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

const WrapperForm = styled.form`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    margin-top: 60px;
    height: 150px;
  }
`;
const CommentCont = styled.div`
  width: 870px;
  display: flex;
  align-items: center;
  margin: 30px 0;
  padding: 40px 0;
  /* 미디어 쿼리 */
  @media (max-width: 768px) {
    ${SubDescription_16_n}
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
      /* 미디어 쿼리 */
      @media (max-width: 768px) {
        width: 40px;
        height: 40px;
        object-fit: cover;
      }
    }
    .profileuploadText {
      ${MainTitle_18_n}
      /* width:640px; */
      width:100%;
      height: 60px;
      margin: 0 30px;
      padding: 0 30px;
      background: var(--color-light-gray-01);
      color: var(--color-gray-01);
      border: none;
      border-radius: 50px;
      &:focus {
        outline: none;
      }
      /* 미디어 쿼리 */
      @media (max-width: 768px) {
        ${SubDescription_16_n}
        margin: 0 10px;
        padding: 0 20px;
        height: 44px;
      }
    }
    .ciEdit,
    .submitBtn {
      color: var(--color-black);
      display: flex;
      justify-content: center;
      align-items: center;
      width: 55px;
      height: 55px;
      background: var(--color-light-gray-01);
      border: none;
      border-radius: 50px;
      cursor: pointer;
      /* 미디어 쿼리 */
      @media (max-width: 768px) {
        width: 44px;
        height: 44px;
        padding: 12px;
      }
    }
    .submitBtn {
      padding: 0;
      ${MainTitle_18_n}
      padding:0 19px;
      margin-right: 30px;
      /* 미디어 쿼리 */
      @media (max-width: 768px) {
        margin-right: 10px;
        padding: 0 14px;
      }
    }
    .ciEdit {
      padding: 13px;
    }
  }
  /* 미디어 쿼리 */
  @media (max-width: 768px) {
    width: 100%;
    margin: 60px 0;
  }
`;

const UploadField = ({ placeholder }) => {
  const { onCreatePost } = useContext(DataDispatchContext);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadText, setUploadText] = useState("");

  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadFile, setUploadFile] = useState(null); // 모달에서 업로드된 이미지 상태

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await onCreatePost("testUserId", "TestUser", uploadText, null);
      setUploadText("");
    } catch (err) {
      console.error("Post upload error:", err);
    } finally {
      setIsLoading(false);
    }
  };
  const handleModalSubmit = ({ text, image }) => {
    setUploadText(text);
    setUploadFile(image);
    // 추가적인 로직이 필요하면 여기에 작성
  };

  const onChange = (e) => {
    setUploadText(e.target.value);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <WrapperForm onSubmit={handleSubmit}>
      <CommentCont>
        <div className="commentUpLoadprofile">
          <img src={testCat} className="profileImg" alt="profileImg" />
          <input
            className="profileuploadText"
            onChange={onChange}
            type="text"
            placeholder={placeholder || "댓글을 입력하세요"}
            value={uploadText}
            required
          />
          <button disabled={isLoading} type="submit" className="submitBtn">
            {isLoading ? (
              <FaSpinner className="spinner" />
            ) : (
              <BsArrowReturnLeft />
            )}
          </button>
          <div>
            <CiEdit className="ciEdit" onClick={openModal} />
          </div>
        </div>
      </CommentCont>
      {isModalOpen && (
        <Mainmodal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
        />
      )}
    </WrapperForm>
  );
};

export default UploadField;
