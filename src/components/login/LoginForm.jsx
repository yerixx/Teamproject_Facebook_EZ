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
import { signInWithEmailAndPassword } from "firebase/auth";

const Error = styled.p`
  text-align: center;
  color: var(--color-error);
  font-weight: 600;
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

    if (isLoading || email === "" || password === "") return;

    try {
      setIsLoading(true);

      await signInWithEmailAndPassword(auth, email, password);

      navigate("/");
    } catch (e) {
      console.log(e);
      setIsLoading(true);
      if (e) {
        let errorCode;
        switch (e.message) {
          case "Firebase: Error (auth/invalid-credential).":
            errorCode = "유효하지 않은 계정입니다.";
            break;
        }
        setError(errorCode);
      }
      // if (e) {
      //   setError(e.message);
      // }
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
      <Input name="submit" type="submit" required width={430} value="로그인" />
      {error !== "" ? <Error>{error}</Error> : null}
    </Form>
  );
};

export default LoginForm;
