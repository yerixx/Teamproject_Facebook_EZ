import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  border: 1px solid #f00;
  display: flex;
  gap: 25.5px;
  justify-content: space-between;
  align-items: center;
  padding: 40px;
  background: #fff;
  box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.2);
  z-index: 999;
  .profileImg {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    border: 1px solid #f00;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .reply_text {
    display: flex;
    align-items: center;
    width: 422px;
    height: 54px;
    padding: 14px 25px;
    background: #e6e6e6;
    border-radius: 50px;
    font-size: 20px;
  }
`;

const Reply = () => {
  return (
    <Wrapper>
      <div className="profileImg">
        <img src="" alt="" />
      </div>
      <div className="reply_text">댓글을 입력해주세요</div>
      <div className="like">❤</div>
    </Wrapper>
  );
};

export default Reply;
