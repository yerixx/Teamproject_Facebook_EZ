// src/components/Mainupload.jsx
import React, { useState } from "react";
import styled from "styled-components";

import { addDoc, collection, updateDoc } from "firebase/firestore";
import { db, storage } from "../../firebase.js";

import "../../styles/loadingSpearTest.css"; // 로딩스피너 테스트
// react-icons
import { BsArrowReturnLeft } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

// img
import testCat from "/img/testcat.jpg";

// font
import {
  MainTitle_18_n,
  SubDescription_16_n,
} from "../../styles/GlobalStyles.styles.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Modal 컴포넌트 임포트
import Mainmodal from "../Main/Mainmodal.jsx"; // 올바른 경로로 수정

const WrapperForm = styled.form`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// CommentCont 스타일 컴포넌트 정의
const CommentCont = styled.div`
  width: 870px;
  display: flex;
  align-items: center;
  padding: 40px 0;
  border-top: 1px solid var(--color-light-gray-01);
  border-bottom: 1px solid var(--color-light-gray-01);

  /* 미디어 쿼리 */
  @media (max-width: 768px) {
    ${SubDescription_16_n}
    margin: 0 10px;
    height: 110px;
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

    .profileInputText {
      ${MainTitle_18_n}
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
      padding:0 20px;
      margin-right: 30px;
      /* 미디어 쿼리 */
      @media (max-width: 768px) {
        margin-right: 10px;
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

const Mainupload = ({ placeholder }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  // 모달 상태 관리
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [postImage, setPostImage] = useState(null); // 모달에서 업로드된 이미지 상태

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 게시물 데이터를 Firebase에 추가하는 로직
    try {
      setIsLoading(true);
      const docRef = await addDoc(collection(db, "contents"), {
        inputText,
        createdAt: Date.now(),
        // 추가 필드: 사용자 정보 등
      });
      // 파일 업로드 로직 (선택 사항)
      if (postImage) {
        const file = await fetch(postImage).then((res) => res.blob());
        const storageRef = ref(storage, `contents/${docRef.id}`);
        const uploadResult = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(uploadResult.ref);
        await updateDoc(docRef, { photo: downloadURL });
      }
      setInputText("");
      setPostImage(null); // 파일 상태 초기화
      setIsModalOpen(false); // 모달 닫기
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalSubmit = ({ text, image }) => {
    setInputText(text);
    setPostImage(image);
    // 추가적인 로직이 필요하면 여기에 작성
  };

  return (
    <WrapperForm onSubmit={handleSubmit}>
      <CommentCont>
        <div className="commentUpLoadprofile">
          <img src={testCat} className="profileImg" alt="profileImg" />
          <input
            className="profileInputText"
            onChange={onChange}
            type="text"
            placeholder={placeholder || "게시물을 입력하세요"}
            value={inputText}
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
            <CiEdit
              className="ciEdit"
              onClick={openModal} // 모달 열기 함수 연결
            />
            {/* 파일 입력 요소 (숨김) */}
            {/* 
              <input
                type='file'
                id='fileInput'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={handleImageUpload}
              />
            */}
          </div>
        </div>
      </CommentCont>
      {/* 모달 컴포넌트 추가 */}
      {isModalOpen && (
        <Mainmodal
          isOpen={isModalOpen}
          onClose={closeModal}
          onSubmit={handleModalSubmit}
        />
      )}
      {/* 모달 내 콘텐츠는 Mainmodal 컴포넌트에서 정의됩니다 */}
    </WrapperForm>
  );
};

export default Mainupload;
