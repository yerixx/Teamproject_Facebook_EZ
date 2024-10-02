import React from "react";
import styled from "styled-components";
import { Button } from "./login-components";

const Wrapper = styled.div`
  width: 100%;
  position: fixed;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  background: var(--color-white);
  box-shadow: 0 -5px 10px var(--color-light-gray-01);
  span {
  }
`;

const MobileButtonWrapper = () => {
  return (
    <Wrapper>
      <Button className="mobileNextButton">다음</Button>
      <span>이미 계정이 있습니다</span>
    </Wrapper>
  );
};

export default MobileButtonWrapper;
