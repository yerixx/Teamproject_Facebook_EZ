import React from "react";
import styled from "styled-components";


import { HeaderBottom, HeaderTop } from "../components/common/Header";
import PhotoVideoList from "../components/detail/PhotoVideoList"
import PostUploadField from "../components/common/PostUploadField"
import PostList from "../components/detail/PostList";
import TopCover from "../components/detail/TopCover";

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
const Detail = () => {
  return <Wrapper>
          <HeaderTop />
          <HeaderBottom />
          <Inner>
            <TopCover/>
            <PostUploadField placeholder="무슨생각을 하고 계신가요?" />
            <PostList />
            <PhotoVideoList/>
          </Inner>
        </Wrapper>;
};

export default Detail;
