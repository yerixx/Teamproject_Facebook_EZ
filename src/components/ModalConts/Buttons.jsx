import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  gap: 60px;
  width: 100%;
  justify-content: space-between;
`;

const Buttons = () => {
  return (
    <Wrapper>
      <div>❤좋아요</div>
      <div>❤댓글</div>
      <div>❤공유하기</div>
      <div>❤저장하기</div>
    </Wrapper>
  );
};

export default Buttons;
