import React from "react";
import styled from "styled-components";
import Input from "./Input";
import { FormTitle, FormItemTitle, FormItemDesc } from "./login-components";
import { MainTitle_18_b } from "../../styles/GlobalStyles.styles";

const Wrapper = styled.form`
  width: 430px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  &.form-login {
    height: 472px;
    .form-group {
      text-align: center;
      input {
        margin-bottom: 10px;
        &[type="submit"] {
          margin-bottom: 0;
          margin-top: 5px;
        }
      }
    }
    .move-signup {
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

  &.form-signup {
    /* height: 780px; */
    ul {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;
      li {
        .inputWrapper {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-bottom: 10px;
        }
      }
      li:last-child {
        .inputWrapper {
          margin-bottom: 0;
        }
      }
    }
  }
`;

export const LoginForm = () => {
  return (
    <Wrapper className="form-login">
      <div>
        <FormTitle>계정으로 로그인</FormTitle>
        <div className="form-group">
          <Input
            name={"emailTel"}
            type={"text"}
            required
            placeholder={"이메일 또는 휴대폰 번호"}
            width={430}
          />
          <Input
            name={"password"}
            type={"password"}
            required
            placeholder={"비밀번호"}
            width={430}
          />
          <FormItemDesc>아이디, 비밀번호를 잊으셨나요?</FormItemDesc>
          <Input
            name={"submit"}
            type={"submit"}
            value={"로그인"}
            required
            width={430}
          />
        </div>
      </div>
      <div className="move-signup">
        <FormItemDesc>아직 계정이 없으신가요?</FormItemDesc>
        <span>새 계정 만들기</span>
      </div>
    </Wrapper>
  );
};

export const SignupForm = () => {
  return (
    <Wrapper className="form-signup">
      <FormTitle>Facebook에 가입하기</FormTitle>
      <ul>
        <li>
          <FormItemTitle>이름 입력</FormItemTitle>
          <FormItemDesc>실명을 입력하세요.</FormItemDesc>
          <div className="inputWrapper">
            <Input
              name={"lastName"}
              type={"text"}
              required
              placeholder={"성"}
              width={210}
            />
            <Input
              name={"firstName"}
              type={"text"}
              required
              placeholder={"이름"}
              width={210}
            />
          </div>
        </li>
        <li>
          <FormItemTitle>이메일 또는 휴대폰 번호 입력</FormItemTitle>
          <FormItemDesc>
            회원님에게 연락할 수 있는 휴대폰 번호를 입력하세요.
            <br /> 이 휴대폰 번호는 다른 사람에게 공개되지 않습니다.
          </FormItemDesc>
          <div className="inputWrapper">
            <Input
              name={"emailTel"}
              type={"text"}
              required
              placeholder={"이메일 또는 휴대폰 번호"}
              width={320}
            />
            <Input
              name={"certification"}
              type={"submit"}
              value={"인증"}
              required
              width={100}
            />
          </div>
          <div className="inputWrapper">
            <Input
              name={"emailTel"}
              type={"text"}
              required
              placeholder={"인증코드"}
              width={320}
            />
            <Input
              name={"certification"}
              type={"submit"}
              value={"확인"}
              required
              width={100}
            />
          </div>
        </li>
        <li>
          <FormItemTitle>비밀번호 입력</FormItemTitle>
          <FormItemDesc>
            6자 이상의 문자 또는 숫자로 비밀번호를 만드세요.
          </FormItemDesc>
          <div className="inputWrapper">
            <Input
              name={"password01"}
              type={"password"}
              required
              placeholder={"비밀번호"}
              width={430}
            />
          </div>
          <div className="inputWrapper">
            <Input
              name={"password02"}
              type={"password"}
              required
              placeholder={"비밀번호 확인"}
              width={430}
            />
          </div>
        </li>
        <li>
          <div className="inputWrapper">
            <Input
              name={"submit"}
              type={"submit"}
              value={"가입하기"}
              required
              width={430}
            />
          </div>
        </li>
      </ul>
    </Wrapper>
  );
};
