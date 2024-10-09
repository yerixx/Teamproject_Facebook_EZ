import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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
import { DataDispatchContext } from "../App";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "../firebase";

const Signup = () => {
  const { onAddUser } = useContext(DataDispatchContext);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    // wallet: "",
    gender: null,
    birthdate: null,
    city: null,
    likeCategory: [null],
  });

  // responsive
  const navigate = useNavigate();

  const [mobileSize, setMobileSize] = useState(false);
  const [searchParams] = useSearchParams();
  const progress = searchParams.get("progress") || "1"; // 기본값 "1"
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
  // userData 업데이트 함수: 하위 컴포넌트에서 호출하여 사용자 데이터를 업데이트
  const updateUserData = (key, value) => {
    setUserData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  // 회원가입 완료 시 호출되는 함수
  const handleSignup = async (data) => {
    // 폼으로부터 받은 데이터로 userData 업데이트
    setUserData((prevData) => ({
      ...prevData,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password1,
    }));

    try {
      // Firebase Authentication을 통해 사용자 등록
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password1
      );
      const user = userCredential.user;

      // 이메일 인증 링크 전송
      await sendEmailVerification(user);
      alert("인증 이메일이 전송되었습니다. 이메일을 확인해주세요.");

      // Firestore에 유저 정보 저장
      await onAddUser(
        user.uid,
        data.firstName,
        data.lastName,
        data.email,
        data.password1,
        userData.gender,
        userData.birthdate,
        userData.city,
        userData.likeCategory
      );

      // 회원가입 완료 후 페이지 이동
      navigate("/login");
    } catch (error) {
      console.error("회원가입 중 오류 발생:", error);
      if (error.code === "auth/email-already-in-use") {
        alert("이미 가입된 이메일입니다.");
      } else {
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
    }
  };
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
          <SignupForm
            updateUserData={updateUserData}
            userData={userData}
            mobileSize={mobileSize}
            handleSignup={handleSignup}
          />
          {progress === "1" && (
            <AdditionalForm
              updateUserData={updateUserData}
              userData={userData}
              mobileSize={mobileSize}
            />
          )}
          {progress === "2" && (
            <SignupCategory
              updateUserData={updateUserData}
              userData={userData}
              progress={progress}
              mobileSize={mobileSize}
            />
          )}
        </FormContainer>
        {mobileSize ? <MobileButtonWrapper></MobileButtonWrapper> : null}
      </Inner>
    </Wrapper>
  );
};

export default Signup;
