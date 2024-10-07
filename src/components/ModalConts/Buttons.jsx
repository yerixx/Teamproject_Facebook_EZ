import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  .onlyPc {
    display: flex;
  }
  .onlyMob {
    display: none;
  }
  .btns {
    display: flex;
    gap: 60px;
    width: 100%;
    justify-content: space-between;
    border: 1px solid #f0f;
  }
  @media screen and (max-width: 1050px) {
    .onlyPc {
      display: none;
    }
    .onlyMob {
      display: block;
      display: display;
      width: calc(100vw - (100vw - 100%));
    }
  }
`;

const Buttons = () => {
  return (
    <Wrapper>
      <div className="onlyPc btns">
        <div>❤좋아요</div>
        <div>❤댓글</div>
        <div>❤공유하기</div>
        <div>❤저장하기</div>
      </div>
      <div className="onlyMob btns">
        <div>❤</div>
        <div>❤</div>
        <div>❤</div>
        <div>❤</div>
      </div>
    </Wrapper>
  );
};

export default Buttons;
