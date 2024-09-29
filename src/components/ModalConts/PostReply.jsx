import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  .profile {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 35px;
    border: 1px solid #f0f;
    img {
      width: 100%;
    }
  }
  .inner {
    .reply_box {
      width: 240px;
      height: 90px;
      padding: 12px;
      display: flex;
      flex-direction: column;
      border-radius: 8px;
      background: #e6e6e6;
      border: 1px solid #f00;
      font-size: 18px;
    }
    .btns {
      display: flex;
      gap: 8px;
      margin-left: 12px;
      font-size: 16px;
      color: #ccc;
    }
  }
`;

const PostReply = () => {
  return (
    <Wrapper>
      <div className="profile">
        <img src="" alt="" />
      </div>
      <div className="inner">
        <div className="reply_box">
          <div>TEXT</div>
        </div>
        <div className="btns">
          <div>좋아요</div>
          <div>댓글달기</div>
        </div>
      </div>
    </Wrapper>
  );
};

export default PostReply;
