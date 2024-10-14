import React from "react";
import styled from "styled-components";

import summerImg from "/img/summer.png";
import PhotoVideoItem from "../detail/PhotoVideoItem.jsx";

const Wrapper = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  padding: 40px 40px;
  margin: 0 auto;
  gap: 20px;
  /* 미디어 쿼리 */
  @media (max-width: 768px) {
    width: 100%;
    padding: 100px 20px 60px;
    gap: 20px;
    /* margin: 0 auto; */
    justify-content: center;
  }
`;

const PhotoVideoList = () => {
  return (
    <Wrapper>
      <PhotoVideoItem title={"고양이는 진짜 귀여운 생명체인거같다..."} />
      <PhotoVideoItem
        imageSrc={summerImg}
        title={"1년만에 다시 찾은 발리🌴"}
        desc={"3 Image 1Video"}
      />
      <PhotoVideoItem title={"빨리 휴가 가고 싶다!!"} desc={"3 Image 1Video"} />
      <PhotoVideoItem
        imageSrc={summerImg}
        title={"수영은 못하지만 튜브는 탈 수 있지 ㅎㅎ"}
        desc={"3 Image 1Video"}
      />
      <PhotoVideoItem title={"🐠🧡"} />
      <PhotoVideoItem imageSrc={summerImg} desc={"3 Image 1Video"} />
      <PhotoVideoItem />
      <PhotoVideoItem
        imageSrc={summerImg}
        title={"1년만에 다시 찾은 발리🌴"}
        desc={"3 Image 1Video"}
      />
    </Wrapper>
  );
};

export default PhotoVideoList;
