// Mainmodal.js
import React, { useState } from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { CiCamera } from "react-icons/ci";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* 최상위에 표시 */
`;

const Inner = styled.div`
  width: 900px;
  border-radius: 30px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  padding: 20px;

  .maodaltile {
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
    }
  }

  .infoitem {
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
      font-size: 30px;
      cursor: pointer;
    }
  }

  .posting {
    padding: 0 60px;

    .posttext {
      display: flex;
      margin: 20px 0;
    }

    .postimg {
      display: flex;
      justify-content: center;
      margin-bottom: 20px;

      img {
        width: 90%;
        border-radius: 8px;
      }
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    textarea {
      width: 100%;
      height: 100px;
      border-radius: 8px;
      padding: 10px;
      font-size: 16px;
      border: 1px solid #ccc;
      resize: vertical;
      margin-bottom: 20px;
    }

    button {
      background: var(--color-facebookblue);
      width: 90%;
      height: 55px;
      border-radius: 8px;
      border: none;
      font-size: 26px;
      font-weight: bold;
      color: var(--color-white);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
  }
`;

const Mainmodal = ({ onClose, onSubmit }) => {
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPostImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 게시물 데이터를 부모 컴포넌트로 전달
    onSubmit({ text: postText, image: postImage });
  };

  return (
    <Wrapper>
      <Inner>
        <div className="maodaltile">
          <div className="title">게시물 올리기</div>
          <div className="xmark" onClick={onClose}>
            <FiX />
          </div>
        </div>
        <div className="infoitem">
          <div className="info">
            <div className="profile"></div>
            <div className="profilename">김정하</div>
          </div>
          <div className="camera">
            <label htmlFor="modal-camera-input">
              <CiCamera />
            </label>
            <input
              id="modal-camera-input"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          </div>
        </div>
        <div className="posting">
          <form onSubmit={handleSubmit}>
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="오늘은 리액트를 배웠다."
              required
            />
            {postImage && (
              <div className="postimg">
                <img src={postImage} alt="게시물 이미지" />
              </div>
            )}
            <button type="submit">게시하기</button>
          </form>
        </div>
      </Inner>
    </Wrapper>
  );
};

export default Mainmodal;
