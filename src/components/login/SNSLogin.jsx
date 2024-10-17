import React from "react";
import { useNavigate } from "react-router-dom";

import { GithubAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";

import styled from "styled-components";
import { FormDesc } from "./login-components";

import googleIcon from "/img/google-icon.svg";
import appleIcon from "/img/apple-icon.svg";
import githubIcon from "/img/github-icon.svg";

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 0;
  p {
    color: inherit;
  }
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

  const onClick = async () => {
    try {
      const providerGithub = new GithubAuthProvider();
      await signInWithPopup(auth, providerGithub);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Wrapper>
      <FormDesc>다른 방법으로 로그인</FormDesc>
      <ul>
        <li>
          <a href="https://github.com/login">
            <img src={githubIcon} />
          </a>
        </li>
        <li>
          <a href="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fwww.google.co.kr%2F%3Fclient%3Dsafari%26channel%3Diphone_bm&ec=GAZAmgQ&hl=ko&ifkv=ARpgrqcJqAo9GBBw8riYeYl4aoXateqwAIPtZdHf5SXGbIqnGtmep8VNYlB83G1ZjfmE2jNMW3X5-g&passive=true&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S1209034674%3A1729184524753367&ddm=0">
            <img src={googleIcon} />
          </a>
        </li>
        <li>
          <a href="https://account.apple.com/sign-in">
            <img src={appleIcon} />
          </a>
        </li>
      </ul>
    </Wrapper>
  );
};

export default SNSLogin;
