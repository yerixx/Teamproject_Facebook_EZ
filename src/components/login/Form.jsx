import React from "react";
import styled from "styled-components";
import Input from "./Input";
import { FormTitle, FormDesc, FormItemTitle } from "./login-components";

const Wrapper = styled.form`
  width: 430px;
  /* height: 780px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  border: 1px solid #f00;
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
  }
`;

const Form = () => {
  return (
    <Wrapper>
      <FormTitle>Facebook에 가입하기</FormTitle>
      <ul>
        <li>
          <FormItemTitle>이름 입력</FormItemTitle>
          <FormDesc>실명을 입력하세요.</FormDesc>
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
          <FormDesc>
            회원님에게 연락할 수 있는 휴대폰 번호를 입력하세요.
            <br /> 이 휴대폰 번호는 다른 사람에게 공개되지 않습니다.
          </FormDesc>
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
          <FormDesc>6자 이상의 문자 또는 숫자로 비밀번호를 만드세요.</FormDesc>
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

export default Form;
