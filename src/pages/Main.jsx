import styled from "styled-components";
import { HeaderBottom, HeaderTop } from "../components/common/Header";
// import LeftSideBar from "../components/common/LeftSideBar";
import ModalCont from "../components/Modal/ModalCont";
import { useContext } from "react";
import { DataDispatchContext, DataStateContext } from "../App";
import MainPage from "../components/Main/Mainpage";
// import SideBarGroup from "../components/common/SideBarGroup";
// import SideBarWallet from "../components/common/SideBarWallet";
import SideBarMenu from "../components/common/SideBarMenu";
import Mainupload from "../components/Main/Mainupload";

const Wrapper = styled.div`
  width: 100%;
  height: 2000px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: end;
`;
const MainSection = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 28px 20px;
  position: absolute;
  top: 140px;
`;
const Maintest = styled.div`
  width: 1000px;
  border: 1px solid #f00;
`;

const Main = () => {
  // const { onCreatePost } = useContext(DataDispatchContext);
  // const { posts } = useContext(DataStateContext);
  // const create = () => {
  //   onCreatePost("1", "sldkjf");
  // };
  return (
    <Wrapper>
      <HeaderTop />
      <HeaderBottom />
      {/* <SideBarWallet /> */}
      {/* <SideBarGroup /> */}
      <SideBarMenu />
      <MainSection>
        <Mainupload />
        <MainPage />
        {/* <Maintest>
          <button onClick={create}>생성</button>
          {posts.map((item, i) => (
            <div key={i}>{item.content}</div>
          ))}
        </Maintest> */}
      </MainSection>

      <ModalCont />
    </Wrapper>
  );
};

export default Main;
