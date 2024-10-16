import React, { useState, useEffect } from "react";
import letterLogoImg from "../img/HeaderLogo.svg";
import circleLogoImg from "../img/Logo.svg";
import AccountLogin from "../components/login/AccountLogin";
import OtherLogin from "../components/login/OtherLogin";
import LoginForm from "../components/login/LoginForm";
import SNSLogin from "../components/login/SNSLogin";
import NavigateSignup from "../components/login/NavigateSignup";
import {
  Wrapper,
  Inner,
  Logo,
  FormContainer,
} from "../components/login/login-components";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  // responsive
  const [mobileSize, setMobileSize] = useState(false);

  const updateSize = (e) => {
    if (e.target.innerWidth <= 768) setMobileSize(true);
    else setMobileSize(false);
  };

  useEffect(() => {
    window.innerWidth <= 768 ? setMobileSize(true) : setMobileSize(false);
    window.addEventListener("resize", updateSize);
    return () => {
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  const goLogin = () => {
    navigate("/login");
  };

  return (
    <Wrapper>
      <Inner>
        <Logo>
          <img
            onClick={goLogin}
            src={mobileSize ? circleLogoImg : letterLogoImg}
            alt="Logo"
          />
        </Logo>
        <FormContainer
          style={{ gap: `30px`, padding: mobileSize ? 0 : `60px` }}
        >
          {mobileSize ? (
            <>
              <LoginForm
                mobileSize={mobileSize}
                setMobileSize={setMobileSize}
              />
              <SNSLogin />
              <NavigateSignup />
            </>
          ) : (
            <>
              <AccountLogin />
              <OtherLogin />
            </>
          )}
        </FormContainer>
      </Inner>
    </Wrapper>
  );
};

export default Login;
