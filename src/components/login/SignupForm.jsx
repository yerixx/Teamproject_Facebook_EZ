import React from "react";
import {
  Form,
  Ul,
  InputWrapperColumn,
  InputWrapperRow,
  Input,
  FormTitle,
  FormItemTitle,
  FormItemDesc,
  MobileFormHeader,
  MobileGoBackBtn,
} from "./login-components";

// <FormTitle className={mobileSize ? "isMobile" : ""}>

const SignupForm = ({ mobileSize }) => {
  return (
    <Form height={700}>
      {mobileSize ? (
        <MobileFormHeader>
          <MobileGoBackBtn>
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
          </MobileGoBackBtn>
          <FormTitle>Facebook에 가입하기</FormTitle>
        </MobileFormHeader>
      ) : (
        <FormTitle>Facebook에 가입하기</FormTitle>
      )}

      <Ul>
        <li>
          <FormItemTitle>이름 입력</FormItemTitle>
          <FormItemDesc>실명을 입력하세요.</FormItemDesc>
          <InputWrapperRow>
            <Input
              name="lastName"
              type="text"
              required
              placeholder="성"
              width={210}
            />
            <Input
              name="firstName"
              type="text"
              required
              placeholder="이름"
              width={210}
            />
          </InputWrapperRow>
        </li>
        <li>
          <FormItemTitle>이메일 또는 휴대폰 번호 입력</FormItemTitle>
          <FormItemDesc>
            회원님에게 연락할 수 있는 휴대폰 번호를 입력하세요.
            <br /> 이 휴대폰 번호는 다른 사람에게 공개되지 않습니다.
          </FormItemDesc>
          <InputWrapperColumn>
            <InputWrapperRow>
              <Input
                name="emailTel"
                type="text"
                required
                placeholder="이메일 또는 휴대폰 번호"
                width={320}
              />
              <Input
                name="certification"
                type="submit"
                value="인증"
                required
                width={100}
                style={{
                  width: `80px`,
                  borderRadius: `var(--border-radius-08)`,
                }}
              />
            </InputWrapperRow>
            <InputWrapperRow>
              <Input
                name="emailTel-code"
                type="text"
                required
                placeholder="인증코드"
                width={320}
              />
              <Input
                name="confirm"
                type="submit"
                value="확인"
                required
                width={100}
                style={{
                  width: `80px`,
                  borderRadius: `var(--border-radius-08)`,
                }}
              />
            </InputWrapperRow>
          </InputWrapperColumn>
        </li>
        <li>
          <FormItemTitle>비밀번호 입력</FormItemTitle>
          <FormItemDesc>
            6자 이상의 문자 또는 숫자로 비밀번호를 만드세요.
          </FormItemDesc>
          <InputWrapperColumn>
            <Input
              name="password01"
              type="password"
              required
              placeholder="비밀번호"
              width={430}
            />
            <Input
              name="password02"
              type="password"
              required
              placeholder="비밀번호 확인"
              width={430}
            />
          </InputWrapperColumn>
        </li>
      </Ul>
      <Input name="submit" type="submit" value="가입하기" width={430} />
    </Form>
  );
};

export default SignupForm;
