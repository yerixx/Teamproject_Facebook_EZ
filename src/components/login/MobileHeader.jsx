import React from "react";
import styled from "styled-components";
import { FormTitle } from "./login-components";
import { Link } from "react-router-dom";

const Wrapper = styled.div`
  width: 100%;
  max-width: 390px;
  height: 60px;
  display: flex;
  align-items: center;
  gap: 5px;
  /* position: fixed;
  top: 0;
  left: 0;
  padding: 0 15px; */
  /* background: var(--color-white); */
  border-bottom: 1px solid var(--color-light-gray-01);
`;
const GoBackBtn = styled.button`
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: transparent;
  cursor: pointer;
  svg {
    stroke: var(--color-black);
    transition: stroke 0.3s;
  }
  &:hover {
    svg {
      stroke: var(--color-gray-02);
    }
  }
`;

const MobileHeader = () => {
  return (
    <Wrapper>
      <Link to={"/login"}>
        <GoBackBtn>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>
        </GoBackBtn>
      </Link>
      <FormTitle>Facebook에 가입하기</FormTitle>
    </Wrapper>
  );
};

export default MobileHeader;
