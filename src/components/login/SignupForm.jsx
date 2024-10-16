import React, { useEffect, useState } from "react";
import MobileFormHeader from "./MobileHeader";
import {
  Form,
  Ul,
  InputWrapperColumn,
  InputWrapperRow,
  Input,
  FormTitle,
  FormItemTitle,
  FormItemDesc,
  Button,
} from "./login-components";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { Link, useSearchParams } from "react-router-dom/dist";
// <FormTitle className={mobileSize ? "isMobile" : ""}>

const Wrapper = styled.div`
  /* height: 750px; */
  padding: 25px 0;
  display: flex;
  justify-content: space-between;
  li {
    position: relative;
  }
  .requiredPoint {
    color: #e53e3e;
  }
  .gotoLogin {
    text-align: center;
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
    height: 100%;
    padding: 0;
    display: block;
    margin-bottom: 40px;
    form > input:last-child {
      width: 360px;
      position: absolute;
      bottom: 0;
    }
  }
`;

const InputWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  span {
    position: absolute;
    bottom: -23px;
    font-size: 14px;
    color: crimson;
  }
`;
const Erorr = styled.span`
  position: absolute;
  bottom: -23px;
  width: 100%;
  font-size: 14px;
  color: crimson;
  text-align: start;
`;

const SignupForm = ({ mobileSize, updateUserData, handleSignup }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    getValues,
  } = useForm();

  const [searchParams] = useSearchParams();
  const progress = searchParams.get("progress") || "1"; // 기본값 "1"

  const onValid = async (data) => {
    if (data.password1 !== data.password2) {
      setError("password1", { message: "비밀번호가 같지 않습니다." });
      return;
    }
    handleSignup(data);
  };

  return (
    <Wrapper>
      <Form onSubmit={handleSubmit(onValid)} height={630}>
        {mobileSize ? null : <FormTitle>Facebook에 가입하기</FormTitle>}
        <Ul>
          <li>
            <FormItemTitle>
              이름 입력 <span className="requiredPoint">*</span>
            </FormItemTitle>
            <FormItemDesc>실명을 입력하세요.</FormItemDesc>
            <InputWrapperRow>
              <InputWrap>
                <Input
                  {...register("firstName", { required: "성을 입력해주세요." })}
                  placeholder="성"
                  width={210}
                />
                <span>{errors?.firstName?.message}</span>
              </InputWrap>
              <InputWrap>
                <Input
                  {...register("lastName", {
                    required: "이름을 입력해주세요.",
                  })}
                  placeholder="이름"
                  width={210}
                />
                <span>{errors?.lastName?.message}</span>
              </InputWrap>
            </InputWrapperRow>
          </li>
          <li>
            <FormItemTitle>
              이메일 입력 <span className="requiredPoint">*</span>
            </FormItemTitle>
            <FormItemDesc>
              회원님에게 연락할 수 있는 이메일을 입력하세요.
              <br /> 이 이메일은 다른 사람에게 공개되지 않습니다.
            </FormItemDesc>
            <InputWrapperColumn>
              <InputWrapperRow>
                <Input
                  {...register("email", {
                    required: "이메일를 입력해주세요.",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "이메일 형식을 맞춰주세요.",
                    },
                  })}
                  placeholder="이메일"
                  width={430}
                />
                {/* <Input
                  name="certification"
                  type="button"
                  onClick={handleSendVerification}
                  value="인증"
                  style={{
                    width: mobileSize ? `80px` : 100,
                    borderRadius: `var(--border-radius-08)`,
                  }}
                /> */}
              </InputWrapperRow>
              <Erorr>{errors?.email?.message}</Erorr>
              {/* <InputWrapperRow>
                <Input
                  {...register("emailTelCode", {
                    required: "인증코드를 입력해주세요.",
                  })}
                  placeholder="인증코드"
                  style={{
                    width: mobileSize ? 270 : 320,
                  }}
                />
                <Input
                  name="confirm"
                  type="submit"
                  value="확인"
                  style={{
                    width: mobileSize ? `80px` : 100,
                    borderRadius: `var(--border-radius-08)`,
                  }}
                />
              </InputWrapperRow> */}
              <Erorr>{errors?.emailTelCode?.message}</Erorr>
            </InputWrapperColumn>
          </li>
          <li>
            <FormItemTitle>
              비밀번호 입력 <span className="requiredPoint">*</span>
            </FormItemTitle>
            <FormItemDesc>
              8자 이상의 문자 또는 숫자로 비밀번호를 만드세요.
            </FormItemDesc>
            <InputWrapperColumn>
              <Input
                {...register("password1", {
                  required: "비밀번호를 입력해주세요.",
                  minLength: {
                    value: 8,
                    message: "비밀번호는 8자 이상 입력해주세요.",
                  },
                  validate: (value) =>
                    value === getValues("password2") ||
                    "비밀번호가 일치하지 않습니다.",
                })}
                type="password"
                placeholder="비밀번호"
                width={430}
              />

              {/* <Erorr>{errors?.password1?.message}</Erorr> */}
              <Input
                {...register("password2", {
                  required: "비밀번호 확인을 입력해주세요.",
                  minLength: 8,
                })}
                type="password"
                placeholder="비밀번호 확인"
                width={430}
              />
              <Erorr>{errors?.password1?.message}</Erorr>
              {/* <Erorr>{errors?.password2?.message}</Erorr> */}
            </InputWrapperColumn>
          </li>
        </Ul>
        {mobileSize ? (
          progress === "2" ? (
            <Input name="submit" type="submit" value="가입하기" width={430} />
          ) : null
        ) : (
          <>
            <FormItemDesc className="gotoLogin">
              <Link to={"/login"}>이미 계정이 있으신가요?</Link>
            </FormItemDesc>
            <Input name="submit" type="submit" value="가입하기" width={430} />
          </>
        )}
      </Form>
    </Wrapper>
  );
};

export default SignupForm;
