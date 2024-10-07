import React, { useState } from "react";
import { auth } from "../../firebase";
import {
  Form,
  InputWrapperColumn,
  Input,
  FormTitle,
  FormItemDesc,
} from "./login-components";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const LoginForm = ({ mobileSize }) => {
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Error state
  const [error, setError] = useState("");

  // Form state
  const [emailTel, setEmailTel] = useState("");
  const [password, setPassword] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "emailTel") setEmailTel(value);
    if (name === "password") setPassword(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    if (isLoading || emailTel === "" || password === "") return;

    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        emailTel,
        password
      );

      // await updateProfile(credentials.user, {});
    } catch (e) {
      setIsLoading(true);
      alert(e);
    } finally {
    }
  };

  return (
    <Form onSubmit={onSubmit} height={280}>
      {mobileSize ? null : <FormTitle>계정으로 로그인</FormTitle>}
      <InputWrapperColumn>
        <Input
          name="emailTel"
          type="text"
          required
          placeholder="이메일 또는 휴대폰 번호"
          width={430}
          onChange={onChange}
          value={emailTel}
        />
        <Input
          name="password"
          type="password"
          required
          placeholder="비밀번호"
          width={430}
          onChange={onChange}
          value={password}
        />
      </InputWrapperColumn>
      <FormItemDesc style={{ textAlign: "center" }}>
        아이디, 비밀번호를 잊으셨나요?
      </FormItemDesc>
      <Input
        name="submit"
        type="submit"
        required
        width={430}
        value={isLoading ? "Loading..." : "로그인"}
      />
    </Form>
  );
};

export default LoginForm;
