import React, { useState, useContext } from "react";
import styled from "styled-components";
import { BsArrowReturnLeft } from "react-icons/bs";
import { FaSpinner } from "react-icons/fa";
import testCat from "/img/testcat.jpg";

const WrapperForm = styled.form`
  width: 100%;
  height: fit-content;
  display: flex;
  justify-content: center;
`;

const CommentCont = styled.div`
  border: 1px solid #000;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 10px;
  
  .commentUpLoadprofile {
    width: 100%;
    display: flex;
    align-items: center;
    
    .profileImg {
      width: 60px;
      height: 60px;
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
      width: 55px;
      height: 55px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 50px;
      cursor: pointer;
    }
  }
`;

const CommentUpload = ({ onCreateComment }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [uploadText, setUploadText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newComment = {
      profilePic: testCat, 
      username: "Username", 
      content: uploadText,
      timestamp: new Date().toISOString(), 
    };

    await onCreateComment(newComment);
    setUploadText(""); 
    setIsLoading(false); 
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
            placeholder="댓글을 입력하세요"
            value={uploadText}
            required
          />
          <button
            disabled={isLoading}
            type="submit"
            className="submitBtn"
          >
            {isLoading ? <FaSpinner /> : <BsArrowReturnLeft />}
          </button>
        </div>
      </CommentCont>
    </WrapperForm>
  );
};

export default CommentUpload;
