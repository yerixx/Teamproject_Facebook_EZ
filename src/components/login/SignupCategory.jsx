import React from "react";
import styled from "styled-components";
import { FormTitle, FormDesc } from "./login-components";
import { MainTitle_18_b } from "../../styles/GlobalStyles.styles";

const Wrapper = styled.div`
  width: 480px;
  height: 730px;
  padding: 25px;
  border-radius: var(--border-radius-08);
  background: var(--color-white);
  box-shadow: var(--box-shadow-01);
  .slide-btns {
    .pager {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 8px;
      margin-bottom: 20px;
      span {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        border: 2px solid transparent;
        background: var(--color-light-gray-01);
        transition: all 0.3s;
        &.active {
          border: 2px solid var(--color-gray-01);
          background: var(--color-white);
        }
      }
    }
    .prevBtn {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      span {
        width: 430px;
        padding: 10px 15px;
        border: 1px solid var(--color-gray-01);
        border-radius: var(--border-radius-08);
        ${MainTitle_18_b};
        text-align: center;
        background: var(--color-white);
        color: var(--color-gray-01);
        cursor: pointer;
        transition: opacity 0.3s;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
`;

const SignupCategory = () => {
  return (
    <Wrapper>
      <FormTitle>회원님을 위한 맞춤 홈피드를 준비할게요</FormTitle>
      <FormDesc>선택된 3개 분야로 그룹을 추천해 드릴게요</FormDesc>
      <ul>
        <li></li>
      </ul>
      <div className="slide-btns">
        <div className="pager">
          <span className="active"></span>
          <span></span>
        </div>
        <div className="prevBtn">
          <span>이전</span>
        </div>
      </div>
    </Wrapper>
  );
};

export default SignupCategory;
