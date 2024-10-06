import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import letterLogoImg from "../img/HeaderLogo.svg";
import circleLogoImg from "../img/Logo.svg";
import SignupForm from "../components/login/SignupForm";
import AdditionalForm from "../components/login/AdditionalForm";
import MobileHeader from "../components/login/MobileHeader";
import MobileButtonWrapper from "../components/login/MobileButtonWrapper";
import SignupCategory from "../components/login/SignupCategory";
import {
  Wrapper,
  Inner,
  Logo,
  FormContainer,
  FormTitle,
} from "../components/login/login-components";

const Signup = () => {
  // responsive
  const [mobileSize, setMobileSize] = useState(false);

  const [searchParams] = useSearchParams();
  const signupProcess = searchParams.get("progress");
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

  return (
    <Wrapper
      style={{
        height: `auto`,
        minHeight: `100vh`,
        flexDirection: `column`,
        gap: `20px`,
        padding: mobileSize ? `20px 0` : `100px 0 150px`,
      }}
    >
      {mobileSize ? (
        <MobileHeader
          title={
            signupProcess === "2" ? "추가정보 입력하기" : "Facebook에 가입하기"
          }
        ></MobileHeader>
      ) : null}
      <Inner>
        {mobileSize ? null : (
          <Logo>
            <img src={letterLogoImg} alt="Logo" />
          </Logo>
        )}
        <FormContainer>
          {mobileSize ? (
            // <SignupForm mobileSize={mobileSize} setMobileSize={setMobileSize} />
            <>
              <AdditionalForm
                mobileSize={mobileSize}
                setMobileSize={setMobileSize}
                progress={signupProcess}
              />
              <SignupCategory progress={signupProcess} />
            </>
          ) : (
            // <SignupCategory
            //   mobileSize={mobileSize}
            //   setMobileSize={setMobileSize}
            // />
            <>
              <SignupForm />
              {/* <AdditionalForm /> */}
              <SignupCategory />
            </>
          )}
        </FormContainer>
        {mobileSize ? <MobileButtonWrapper></MobileButtonWrapper> : null}
      </Inner>
    </Wrapper>
  );
};

export default Signup;
