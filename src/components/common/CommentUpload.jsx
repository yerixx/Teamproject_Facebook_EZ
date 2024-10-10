import React, { useState, useContext } from "react";
import { DataDispatchContext, DataStateContext } from "../../App.jsx";

import styled from "styled-components";
import { SubDescription_16_n } from "../../styles/GlobalStyles.styles.js";

import { BsArrowReturnLeft } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { CiEdit, CiCamera } from "react-icons/ci";
import { FiX } from "react-icons/fi";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase";
import testCat from "/img/testcat.jpg";

// Styled-components
const WrapperForm = styled.form`
border: 1px solid #f00;
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
  @media (max-width: 768px) {
    margin-top: 60px;
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
  width: var(--inner-width-02);
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
const Posting = styled.div`
  padding: 0 60px;
  textarea {
    width: 100%;
    height: 100px;
    border-radius: 8px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
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
    }
  }
`;

const CommentUpload = ({ placeholder }) => {
  const {state} = useContext(DataStateContext)
  const { onCreateComment } = useContext(DataDispatchContext);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadText, setUploadText] = useState("");
console.log(onCreateComment)
console.log(state)
  const handleSubmit = () => {}




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
            // onClick={handleCheck}
            disabled={isLoading}
            type="submit"
            className="submitBtn"
          >
            {isLoading ? <FaSpinner /> : <BsArrowReturnLeft />}
          </button>
          {/* <div>
            <CiEdit className="ciEdit" onClick={openModal} />
          </div> */}
        </div>
      </CommentCont>
    </WrapperForm>
  );
};

export default CommentUpload;
