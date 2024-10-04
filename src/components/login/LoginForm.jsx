import React from "react";
import {
  Form,
  InputWrapperColumn,
  Input,
  FormTitle,
  FormItemDesc,
} from "./login-components";

const LoginForm = ({ mobileSize }) => {
  return (
    <Form height={280}>
      {mobileSize ? null : <FormTitle>계정으로 로그인</FormTitle>}
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
      <FormItemDesc style={{ textAlign: "center" }}>
        아이디, 비밀번호를 잊으셨나요?
      </FormItemDesc>
      <Input name="submit" type="submit" value="로그인" required width={430} />
    </Form>
  );
};

export default LoginForm;
