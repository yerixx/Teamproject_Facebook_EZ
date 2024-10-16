import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import Logoimg from "/img/Logo.svg";

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CircleContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
`;
const Circle = styled(motion.span)`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: #1877f2;
  box-shadow: 3px 8px 10px 0px rgba(15, 22, 30, 0.11);
`;
const CircleLogo = styled(motion.span)`
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: url(${Logoimg}) center/cover no-repeat;
  box-shadow: 3px 8px 10px 0px rgba(15, 22, 30, 0.11);
`;

const containerVariants = {
  start: {
    transition: {
      staggerChildren: 0.1,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};
const circleVariants = {
  start: {
    scale: 0.9,
    y: 0,
  },
  end: {
    scale: 1,
    y: -20,
    transition: {
      ease: "easeInOut",
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse",
    },
  },
};

const LoadingScreen = () => {
  return (
    <Wrapper>
      <CircleContainer
        variants={containerVariants}
        initial={"start"}
        animate={"end"}
      >
        <Circle variants={circleVariants} />
        <CircleLogo variants={circleVariants} />
        <Circle variants={circleVariants} />
      </CircleContainer>
    </Wrapper>
  );
};

export default LoadingScreen;
