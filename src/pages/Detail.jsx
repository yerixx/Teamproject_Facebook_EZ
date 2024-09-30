import React from "react";
import styled from "styled-components";

import { HeaderBottom1, HeaderTop1 } from "../components/common/Header";
import PhotoVideoList from "../components/detail/PhotoVideoList"
import PostInputField from "../components/detail/PostInputField"
import PostList from "../components/detail/PostList";
import TopCover from "../components/detail/TopCover";

const Wrapper = styled.div`
  width: 100%;
  height:fit-content;
  margin:0 auto;
  box-shadow:var(--box-shadow-01);
`
const Inner = styled.div`
  width: 1050px;
  height:fit-content;
  margin:0 auto;
  box-shadow:var(--box-shadow-01);
`
const Detail = () => {
  return <Wrapper>
          <HeaderTop1 />
          <HeaderBottom1 />
          <Inner>
            <TopCover/>
            <PostInputField placeholder="무슨생각을 하고 계신가요?" />
            <PostList />
            <PhotoVideoList/>
          </Inner>
        </Wrapper>;
};

export default Detail;
