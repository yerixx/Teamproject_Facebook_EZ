import { useRef, useEffect, useState } from "react";
import {
  delay,
  motion,
  useMotionValue,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import { createGlobalStyle, styled } from "styled-components";
import reset from "styled-reset";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { CgClose } from "react-icons/cg";

const GlobalStyles = createGlobalStyle`
  ${reset};

  * {
    margin: 0px;
    padding: 0px;
    box-sizing: border-box;
  }

  body {
    font-family: "Source Sans 3", sans-serif;
    background: linear-gradient(135deg, #e09, #d0e);
  }

  ul, li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

const ContSlide = styled.div`
  flex: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #050505;
  position: relative;
`;

const Wrapper = styled.div`
  .contImg {
    width: 746px;
    height: 746px;
    border: 1px solid #f00;
  }
  .closeBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    /* border: 1px solid #f0f; */
    position: absolute;
    top: 40px;
    right: 40px;
    font-size: 40px;
    color: #fff;
  }
  .slideBtn {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 50vw;
    font-size: 35px;
  }
  @media screen and (max-width: 1050px) {
    .contImg {
      width: 100vw;
      height: 100vw;
      border: 1px solid #f00;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .closeBtn {
      display: none;
    }
    .slideBtn {
      display: none;
    }
  }
`;

const ContImg = styled.div`
  width: 100%;
  height: 100%;
  background: url("https://www.next-t.co.kr/public/uploads/7b7f7e2138e29e598cd0cdf2c85ea08d.jpg")
    center/cover no-repeat;
`;

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: 50%;
  width: 68px;
  height: 68px;
  color: #000;
`;

const ContentsSec = () => {
  return (
    <ContSlide>
      <Wrapper>
        <div className="contImg">
          <ContImg />
        </div>
        <div className="closeBtn">
          <CgClose />
        </div>
        <div className="slideBtn">
          <Button className="prev">
            <FaAngleLeft />
          </Button>
          <Button className="next">
            <FaAngleRight />
          </Button>
        </div>
      </Wrapper>
    </ContSlide>
  );
};

export default ContentsSec;
