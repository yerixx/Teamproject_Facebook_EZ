import React, { useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  Form,
  InputWrapperColumn,
  Input,
  FormTitle,
  FormItemDesc,
} from "./login-components";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const Error = styled.p`
  text-align: center;
  color: var(--color-error);
`;

const LoginForm = ({ mobileSize }) => {
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  // Error state
  const [error, setError] = useState("");

  // Form state
  const [email, setEmailTel] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmailTel(value);
    if (name === "password") setPassword(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();

    if (isLoading || emaiemaillTel === "" || password === "") return;

    try {
      const credentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // await updateProfile(credentials.user, {});

      navigate("/");
    } catch (e) {
      setIsLoading(true);
      if (e) setError(e.message);
      alert(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={onSubmit} height={280}>
      {mobileSize ? null : <FormTitle>계정으로 로그인</FormTitle>}
      <InputWrapperColumn>
        <Input
          name="email"
          type="email"
          required
          placeholder="이메일 또는 휴대폰 번호"
          width={430}
          onChange={onChange}
          value={email}
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
      <Error> Don't you have an account?</Error>
    </Form>
  );
};

export default LoginForm;
