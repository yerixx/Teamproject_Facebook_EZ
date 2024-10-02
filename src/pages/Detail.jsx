import React,{ useState } from "react";
import styled from "styled-components";
import { motion } from 'framer-motion';


import { HeaderBottom, HeaderTop } from "../components/common/Header";
import PostUploadField from "../components/common/PostUploadField.jsx"
import PhotoVideoList from "../components/detail/PhotoVideoList"
import PostList from "../components/detail/PostList";
import TopCover from "../components/detail/TopCover";

import {Paragraph_20_n} from "../styles/GlobalStyles.styles.js"


const Wrapper = styled.div`
  width: 100%;
  height:fit-content;
  margin:0 auto;
  box-shadow:var(--box-shadow-01);

    /* 미디어 쿼리 */
    @media (max-width : 768px) {
      max-width: 100%;
    }
`
const Inner = styled.div`
  width: 1050px;
  height:fit-content;
  margin:0 auto;
  box-shadow:var(--box-shadow-01);
    /* 미디어 쿼리 */
    @media (max-width : 768px) {
      max-width: 100%;
    }
`
const ContChangeBtn = styled(motion.div)`
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 20px 0;
  position: relative; 
  /* border-bottom:1.2px solid var(--color-gray-01); */
  button {
    ${Paragraph_20_n}
    flex: 1;
    background: none;
    border: none;
    color: var(--color-gray-01);
    padding-bottom: 10px;
    position: relative;
    cursor: pointer;
  }
  .underline {
    position: absolute;
    bottom: -2px;
    height: 4px;
    background-color: var(--color-facebookblue);
    width: 50%;

  }
`;

const UploadInner = styled.div`
  padding:0 30px;
`


const Detail = () => {
  const [id, setId] = useState(0)

  const handleClick = (tabId) => {
    setId(tabId)
    // console.log(tabId)
  }
  return <Wrapper>
          <HeaderTop />
          <HeaderBottom />
          <Inner >
            <TopCover/>
            <ContChangeBtn selectedTab={id}>
              <button layoutId="underline" onClick={() => handleClick(0)}>게시글</button>
              <button layoutId="underline" onClick={() => handleClick(1)}>사진 및 동영상</button>
              <motion.div
                className="underline"
                layoutId="underline"
                style={{
                  width: id === 0 ? "50%" : "50%", // 탭 크기에 맞춰 설정
                  left: id === 0 ? "0%" : "50%",  // 위치에 따라 변경
                }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              />
            </ContChangeBtn>
            <UploadInner> 
              <PostUploadField  placeholder="무슨생각을 하고 계신가요?" />
            </UploadInner>
            <div style={{display: id === 0 ? "block" : "none"}}>
              <PostList  />
            </div>
            <div style={{display: id === 1 ? "block" : "none"}}>  
              <PhotoVideoList />
            </div>
          </Inner>
        </Wrapper>;
};

export default Detail;
