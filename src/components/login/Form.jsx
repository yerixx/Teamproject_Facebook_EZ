import React from "react";
import styled from "styled-components";

const Wrapper = styled.form`
  width: 430px;
  height: 780px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;
const FormTitle = styled.h3`
  font-size: var(--font-size-title-02);
  font-weight: var(--font-weight-bold);
  text-align: center;
  margin-bottom: 30px;
`;
const FormItemTitle = styled.h5`
  font-size: var(--font-size-paragraph);
  font-weight: var(--font-weight-medium);
`;

const Form = () => {
  return (
    <Wrapper>
      <FormTitle>Facebook에 가입하기</FormTitle>
      <ul>
        <li>
          <FormItemTitle>이름 입력</FormItemTitle>
          <span>실명을 입력하세요.</span>
          <div>
            <input placeholder="성" />
            <input placeholder="이름" />
          </div>
        </li>
        <li>
          <FormItemTitle>이메일 또는 휴대폰 번호 입력</FormItemTitle>
          <span>
            회원님에게 연락할 수 있는 휴대폰 번호를 입력하세요. 이 휴대폰 번호는
            다른 사람에게 공개되지 않습니다
          </span>
          <div>
            <input placeholder="성" />
            <button>인증</button>
          </div>
          <div>
            <input placeholder="성" />
            <button>인증</button>
          </div>
        </li>
      </ul>
    </Wrapper>
  );
};

export default Form;
