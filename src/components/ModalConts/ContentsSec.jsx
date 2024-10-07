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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
    img {
      width: 100%;
      height: 100%;
    }
  }
  .closeBtn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    position: absolute;
    top: 40px;
    right: 40px;
    /* background: #fff; */
    .fa-x {
      color: #fff;
    }
  }
  .slideBtn {
    position: absolute;
    top: 48%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 50vw;
    .prev {
      display: flex;
      align-items: center;
      justify-content: center;
      background: #fff;
      border-radius: 50%;
      width: 68px;
      height: 68px;
      color: #000;
    }
    .next {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 68px;
      height: 68px;
      background: #fff;
      border-radius: 50%;
      color: #000;
    }
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

const ContentsSec = () => {
  return (
    <ContSlide>
      <Wrapper>
        <div className="contImg">
          <img src="" alt="" />
        </div>
        <div className="closeBtn">
          X
          <FontAwesomeIcon icon="fa-solid fa-x" />
        </div>
        <div className="slideBtn">
          <div className="prev">
            <FontAwesomeIcon icon="fa-solid fa-angle-left" />
            left
          </div>
          <div className="next">
            right
            <FontAwesomeIcon icon="fa-solid fa-angle-right" />
          </div>
        </div>
      </Wrapper>
    </ContSlide>
  );
};

export default ContentsSec;
