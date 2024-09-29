import React from "react";
import styled from "styled-components";
import { IoPersonSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
  gap: 10px;
`;

const Inner = styled.div`
  border: 1px solid red;
  width: 1000px;
  height: 302px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  display: flex;
  align-items: center;
  padding: 0 27px;
  gap: 8px;
`;

const StoryItem = styled.div`
  width: 150px;
  height: 252px;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  background: var(--color-light-gray-01);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  padding-bottom: 8px;
  .humanicon {
    width: 100%;
    height: 158px;
    font-size: 167px;
    color: var(--color-gray-01);
    position: absolute;
    top: 0;
    right: 7px;
  }
  .plusicon {
    border-radius: 50%;
    background: var(--color-facebookblue);
    width: 44px;
    height: 44px;
    border: 4px solid #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 25px;
    color: #fff;
    position: absolute;
    top: 135px;
    left: 55px;
  }
  .text {
    margin-top: 5px;
    font-size: 14px;
    color: #333;
  }
`;

const MainStory = () => {
  return (
    <Wrapper>
      <Inner>
        <StoryItem>
          <div className="humanicon">
            <IoPersonSharp />
          </div>
          <div className="plusicon">
            <FaPlus />
          </div>
          <div className="text">스토리 만들기</div>
        </StoryItem>
        <StoryItem>
          <div className="text">스토리</div>
        </StoryItem>
      </Inner>
    </Wrapper>
  );
};

export default MainStory;
