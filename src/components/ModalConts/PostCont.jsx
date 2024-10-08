import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  @media screen and (max-width: 1050px) {
    color: #fff;
    height: 140px;
    padding: 14px;
    width: calc(100vw - (100vw - 100%));
  }
`;

const PostCont = () => {
  return (
    <Wrapper>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Nam soluta
        minus itaque. Non, sit nostrum commodi repellendus reiciendis tempora in
        cum sed veniam at inventore soluta neque harum impedit. Libero?
      </p>
    </Wrapper>
  );
};

export default PostCont;
