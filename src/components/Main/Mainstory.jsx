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

const Storyitem = styled.div`
  width: 150px;
  height: 252px;
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  background: var(--color-light-gray-01);
  position: relative;
  .mystory {
    border-radius: 8px 8px 0 0;
    .humanicon {
      /* border: 1px solid red; */
      width: 100%;
      height: 158px;
      font-size: 167px;
      color: var(--color-gray-01);
      position: absolute;
      top: 0;
      right: 7px;
    }
    .storymake {
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
        z-index: 1;
      }
    }
    .textitem {
      width: 100%;
      height: 94px;
      display: flex;
      position: absolute;
      top: 157px;
      border-radius: 0 0 8px 8px;
      background: #fff;
    }
    .text {
      position: absolute;
      top: 225px;
      left: 35px;
    }
  }
`;

const Mainstory = () => {
  return (
    <Wrapper>
      <Inner>
        <Storyitem>
          <div className="mystory">
            <div className="humanicon">
              <IoPersonSharp />
            </div>
            <div className="storymake">
              <div className="plusicon">
                <FaPlus />
              </div>
            </div>
            <div className="textitem"></div>
            <div className="text">스토리 만들기</div>
          </div>
        </Storyitem>
        <Storyitem>
          <div className="mystory"></div>
        </Storyitem>
      </Inner>
    </Wrapper>
  );
};

export default Mainstory;
