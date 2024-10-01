import React from "react";
import styled from "styled-components";
import { FiX } from "react-icons/fi";
import { CiCamera } from "react-icons/ci";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
  gap: 10px;
`;

const Inner = styled.div`
  width: 900px;
  border: 1px solid red;
  border-radius: 30px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  .maodaltile {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 26px;
    border-bottom: 1px solid red;
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
      top: 18px;
      right: 20px;
    }
  }
  .infoitem {
    display: flex;
    justify-content: space-between;
    margin: 0 60px;
    .info {
      font-size: 16px;
      font-weight: bold;
      display: flex;
      gap: 10px;
      align-items: center;
      .profile {
        border: 1px solid red;
        width: 40px;
        height: 40px;
        border-radius: 50%;
      }
      .profilename {
        color: var(--color-gray-01);
      }
    }
    .camera {
      font-size: 30px;
    }
  }

  width: 780px;
  .posttext {
    margin: 0px 70px;
    display: flex;
  }
  button {
    background: var(--color-facebookblue);
    width: 670px;
    height: 59px;
    margin: 0 auto;
    border-radius: 8px;
    border: none;
    font-size: 26px;
    font-weight: bold;
    color: var(--color-white);
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

const Mainmodal = () => {
  return (
    <Wrapper>
      <Inner>
        <div className="maodaltile">
          <div className="title">게시물 올리기</div>
          <div className="xmark">
            <FiX />
          </div>
        </div>
        <div className="post">
          <div className="infoitem">
            <div className="info">
              <div className="profile"></div>
              <div className="profilename">김정하</div>
            </div>
            <div className="camera">
              <CiCamera />
            </div>
          </div>
          <div className="posttext">오늘은 리액트를 배웠다.</div>
          <div className="postimg">
            <img />
          </div>
          <button>게시하기</button>
        </div>
      </Inner>
    </Wrapper>
  );
};

export default Mainmodal;
