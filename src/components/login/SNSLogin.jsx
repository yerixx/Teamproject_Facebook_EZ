import React from "react";
import styled from "styled-components";
import {
  GoogleAuthProvider,
  TwitterAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import googleIcon from "../../img/google-icon.svg";
import appleIcon from "../../img/apple-icon.svg";
import githubIcon from "../../img/github-icon.svg";
import { FormDesc } from "./login-components";

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 0;
  border-top: 1px solid var(--color-gray-02);
  border-bottom: 1px solid var(--color-gray-02);
  ul {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
    li {
      width: 45px;
      height: 45px;
      background: var(--color-gray-02);
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      img {
        width: 23px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    padding: 20px 0;
  }
`;

const SNSLogin = () => {
  const navigate = useNavigate();

  const onClick = async (e) => {
    try {
      if (e.target.id === "google") {
        const providerGoogle = new GoogleAuthProvider();
        await signInWithPopup(auth, providerGoogle);
      } else if (e.target.id === "github") {
        const providerGithub = new GithubAuthProvider();
        await signInWithPopup(auth, providerGithub);
      }

      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper>
      <FormDesc>다른 방법으로 로그인</FormDesc>
      <ul>
        <li onClick={onClick} id="google">
          <img src={googleIcon} />
        </li>
        <li onClick={onClick} id="apple">
          <img src={appleIcon} />
        </li>
        <li onClick={onClick} id="github">
          <img src={githubIcon} />
        </li>
      </ul>
    </Wrapper>
  );
};

export default SNSLogin;
