import React from "react";

import styled from "styled-components";
import PostItem from "../detail/PostItem";

import testCat from "/img/testcat.jpg";
import summerImg from "/img/summer.png";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding-bottom: 60px;
  /* border:1px solid #f00; */
`;

const PostList = () => {
  return (
    <Wrapper>
      <PostItem
        imageSrc={testCat}
        contentDesc={"고양이는 정말 귀여운거 같아.."}
      />
      <PostItem />
      <PostItem
        imageSrc={summerImg}
        contentDesc={
          "셋이서 강을 바라보던 모습이 폰디체리 바다를 하염없이 바라보던 내 틴 시절과 겹쳐져서 한참을 바라봤었다 "
        }
      />
    </Wrapper>
  );
};

export default PostList;
