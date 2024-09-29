import React from "react";
import styled from "styled-components";
import { motion, stagger } from "framer-motion";

const Wrapper = styled.div`
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
  /* background: var(--color-facebookblue); */
  background: linear-gradient(to bottom, #16aafd, #016ae1);
  box-shadow: var(--box-shadow-02);
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
    scale: 0.8,
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
        <Circle variants={circleVariants} />
        <Circle variants={circleVariants} />
      </CircleContainer>
    </Wrapper>
  );
};

export default LoadingScreen;
