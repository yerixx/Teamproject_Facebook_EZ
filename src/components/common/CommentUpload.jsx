import React, { useState, useContext } from "react";
import styled from "styled-components";
import { BsArrowReturnLeft } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import { DataStateContext } from "../../App.jsx";

const WrapperForm = styled.form`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
`;
const CommentCont = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  @media (max-width: 768px) {
    padding: 0;
  }
  .commentUpLoadprofile {
    width: 100%;
    display: flex;
    align-items: center;
    .profileImg {
      width: 45px;
      height: 45px;
      border-radius: 100px;
    }
    .profileuploadText {
      width: 100%;
      height: 40px;
      margin: 0 15px;
      padding: 0 20px;
      border: 1px solid #ccc;
      border-radius: 20px;
      &:focus {
        outline: none;
      }
    }
    .submitBtn {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 15px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 50px;
      cursor: pointer;
    }
    .submitBtn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  }
`;
const CommentUpload = ({ postId, onCreateComment }) => {
  const { currentUserData } = useContext(DataStateContext);

  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return; // 공백 방지
    try {
      setIsLoading(true);
      await onCreateComment(content); // postId는 상위 컴포넌트에서 처리됨
      setContent(""); // 입력창 초기화
    } catch (error) {
      console.error("댓글 업로드 실패:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <WrapperForm onSubmit={handleSubmit}>
      <CommentCont>
        <div className="commentUpLoadprofile">
          <img
            className="profileImg"
            src={currentUserData?.profileImage || "/img/defaultProfile.jpg"}
            alt="Profile"
          />
          <input
            className="profileuploadText"
            onChange={(e) => setContent(e.target.value)}
            type="text"
            placeholder="댓글을 입력하세요"
            value={content}
            required
          />
          <button disabled={isLoading} type="submit" className="submitBtn">
            {isLoading ? <FaSpinner /> : <BsArrowReturnLeft />}
          </button>
        </div>
      </CommentCont>
    </WrapperForm>
  );
};
export default CommentUpload;
