import React from "react";
import styled from "styled-components";
import { BsThreeDots } from "react-icons/bs";
import { FaEarthAmericas } from "react-icons/fa6";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Inner = styled.div`
  box-shadow: var(--box-shadow-01);
  border: 1px solid red;
  border-radius: var(--border-radius-08);
  width: 100%;
  max-width: 833px;
  height: 419px;
  padding: 27px 30px 0;
`;

const PostInfo = styled.div`
  border: 1px solid red;
  display: flex;
  align-items: center;
  gap: 14px;
  width: 200px;
  height: 60px;
  padding: 5px;
  .profile {
    border-radius: 90%;
    background: var(--color-gray-02);
    width: 50px;
    height: 50px;
  }
  .info {
    display: flex;
    flex-direction: column;
    .name {
      font-size: 18px;
    }
    .item {
      display: flex;
      gap: 5px;
    }
  }
`;

const MainPost = () => {
  return (
    <Wrapper>
      <Inner>
        <PostInfo>
          <div className="profile"></div>
          <div className="info">
            <div className="name">김정하</div>
            <div className="item">
              <div className="clock">1시간전 </div>
              <div className="icon">
                <FaEarthAmericas />
              </div>
            </div>
          </div>
        </PostInfo>
        <div></div>
      </Inner>
    </Wrapper>
  );
};

export default MainPost;
