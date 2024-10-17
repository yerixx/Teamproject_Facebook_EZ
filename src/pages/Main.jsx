import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { HeaderBottom, HeaderTop } from "../components/common/Header";
import PostUpload from "../components/common/PostUpload";
import Mainstory from "../components/Main/Mainstory";
import Mainlive from "../components/Main/Mainlive";
import MainGroup from "../components/Main/MainGroup";
import Mainpage from "../components/Main/Mainpage";
import { auth } from "../firebase";
import { DataStateContext } from "../App";
import LoadingScreen from "../components/common/LoadingScreen";

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
const PostUploadField = styled.div`
  width: var(--inner-width-02);
  background-color: ${(props) => props.theme.ContainColor};
  box-shadow: var(--box-shadow-01);
  padding: 20px;
  border-radius: var(--border-radius-30);
  @media (max-width: 768px) {
    width: 90vw;
    height: 80px;
  }
`;

const MainSection = styled.section`
  margin-bottom: 20px;
  width: 1050px;
  padding: 0 90px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 30px;
  top: 140px;
  @media screen and (max-width: 768px) {
    width: 100%;
    top: 70px;
  }
`;

const Main = ({ placeholder }) => {
  const { currentUserData } = useContext(DataStateContext);
  const [loading, setLoading] = useState(true); // 로딩 상태 관리
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const initialize = async () => {
      try {
        // 사용자 인증 상태 체크
        await auth.onAuthStateChanged((user) => {
          if (user) {
          }
        });

        // 필요한 데이터가 로드될 때까지 대기
        if (currentUserData) {
        }

        // 모든 데이터가 준비되면 로딩 상태 해제
        setLoading(false);
      } catch (error) {
        console.error("초기화 중 오류가 발생했습니다.", error);
      }
    };

    initialize();
  }, [currentUserData]);

  if (loading) {
    return <LoadingScreen />;
  }

  const isSearching = searchTerm.trim().length > 0;

  return (
    <Wrapper>
      <HeaderTop />
      <HeaderBottom onSearch={(term) => setSearchTerm(term)} />
      <MainSection>
        {isSearching ? (
          <Mainpage searchTerm={searchTerm} />
        ) : (
          <>
            <Mainstory />
            <PostUploadField style={{ padding: "10px 0" }}>
              <PostUpload placeholder={"오늘 어떤일이 있으셨나요?"} />
            </PostUploadField>
            <MainGroup />
            <Mainpage searchTerm={searchTerm} />
          </>
        )}
      </MainSection>
    </Wrapper>
  );
};

export default Main;
