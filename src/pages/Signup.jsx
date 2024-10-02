import React, { useState, useEffect } from "react";
import styled from "styled-components";
import letterLogoImg from "../img/HeaderLogo.svg";
import circleLogoImg from "../img/Logo.svg";
import SignupForm from "../components/login/SignupForm";
import AdditionalForm from "../components/login/AdditionalForm";
import SignupCategory from "../components/login/SignupCategory";
import {
  Wrapper,
  Inner,
  Logo,
  FormContainer,
} from "../components/login/login-components";

// const Wrapper = styled.section`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   padding: 100px 0;
//   background: var(--color-light-gray-02);
// `;

const Signup = () => {
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

  return (
    <Wrapper
      style={{
        height: mobileSize ? `100vh` : `auto`,
        padding: mobileSize ? `15px 0` : `100px 0 150px`,
      }}
    >
      <Inner>
        {mobileSize ? null : (
          <Logo>
            <img src={letterLogoImg} alt="Logo" />
          </Logo>
        )}
        <FormContainer>
          {mobileSize ? (
            <SignupForm mobileSize={mobileSize} setMobileSize={setMobileSize} />
          ) : (
            <>
              <SignupForm />
              <AdditionalForm />
              {/* <SignupCategory /> */}
            </>
          )}
        </FormContainer>
      </Inner>
    </Wrapper>
  );
};

export default Signup;
