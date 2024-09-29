import styled from "styled-components";
import { HeaderBottom, HeaderTop } from "../components/common/Header";
// import LeftSideBar from "../components/common/LeftSideBar";

import ModalCont from "../components/Modal/ModalCont";
import RightSideBar from "../components/common/RightSideBar";
import LeftSideBar from "../components/common/LeftSideBar";
import { useContext, useState } from "react";
import { DataDispatchContext, DataStateContext } from "../App";

const Wrapper = styled.div`
  height: 2000px;
  width: 100%;
`;
const MainSection = styled.section`
  display: flex;
  justify-content: center;
  padding: 28px 20px;
`;
const Maintest = styled.div`
  width: 1000px;
  border: 1px solid #f00;
`;

const Main = () => {
  const { onCreatePost } = useContext(DataDispatchContext);
  const { posts } = useContext(DataStateContext);
  console.log(posts);

  const create = () => {
    onCreatePost("1", "sldkjf");
  };
  return (
    <Wrapper>
      <HeaderTop />
      <HeaderBottom />
      <MainSection>
        {/* <LeftSideBar /> */}
        <Maintest>
          <button onClick={create}>생성</button>
          {posts.map((item, i) => (
            <div key={i}>{item.content}</div>
          ))}
        </Maintest>
        {/* <RightSideBar /> */}
      </MainSection>
      <ModalCont />
    </Wrapper>
  );
};

export default Main;
