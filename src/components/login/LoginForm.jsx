import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Form,
  InputWrapperColumn,
  Input,
  FormTitle,
  FormItemDesc,
  Button,
} from "./login-components";

const Wrapper = styled.div`
  width: 430px;
  height: 472px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  text-align: center;
  .move-signup {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

const LoginForm = () => {
  return (
    <Wrapper>
      <Form height={280}>
        <FormTitle>계정으로 로그인</FormTitle>
        <InputWrapperColumn>
          <Input
            name="emailTel"
            type="text"
            required
            placeholder="이메일 또는 휴대폰 번호"
            width={430}
          />
          <Input
            name="password"
            type="password"
            required
            placeholder="비밀번호"
            width={430}
          />
        </InputWrapperColumn>
        <FormItemDesc>아이디, 비밀번호를 잊으셨나요?</FormItemDesc>
        <Input
          name="submit"
          type="submit"
          value="로그인"
          required
          width={430}
        />
      </Form>
      <div className="move-signup">
        <FormItemDesc>아직 계정이 없으신가요?</FormItemDesc>
        <Link to={"/signup"}>
          <Button>새 계정 만들기</Button>
        </Link>
      </div>
    </Wrapper>
  );
};

export default LoginForm;
