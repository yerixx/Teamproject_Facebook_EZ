import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  .btns {
    display: flex;
    gap: 60px;
    width: 100%;
    justify-content: space-between;
    border: 1px solid #f0f;
  }
  @media screen and (max-width: 1050px) {
    color: #fff;
    display: display;
    position: absolute;
    bottom: 0;
    width: 100%;
    .btns {
      font-size: 25px;
      gap: 10px;
      padding: 16px 50px;
      & > div {
        & > span {
          display: none;
        }
      }
    }
  }
`;

const Buttons = () => {
  return (
    <Wrapper>
      <div className="btns">
        <div>
          ❤ <span>좋아요</span>
        </div>
        <div>
          ❤<span>댓글</span>
        </div>
        <div>
          ❤<span>공유하기</span>
        </div>
        <div>
          ❤<span>저장하기</span>
        </div>
      </div>
    </Wrapper>
  );
};

export default Buttons;
