import styled from "styled-components";
import { Paragraph_20_n } from "../../styles/GlobalStyles.styles";
import { IoClose } from "react-icons/io5";
import { useEffect, useRef } from "react";

const Wrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "isOpen",
})`
  z-index: 3;
  position: absolute;
  top: 100px;
  right: 20px;
  width: 382px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #fff;
  padding: 28px 20px;
  border-radius: var(--border-radius-30);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow-y: auto;
  -ms-overflow-style: none; /* IE, Edge */
  scrollbar-width: none;
  @media screen and (max-width: 1050px) {
    top: 130px;
    right: 10px;
  }
  @media screen and (max-width: 768px) {
    width: 330px;
    top: 70px;
  }
`;

const TopTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    ${Paragraph_20_n}
  }
  margin-bottom: 10px;
  span {
    cursor: pointer;
  }
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Group = styled.div`
  /* box-shadow: 0 0 8px rgba(0, 0, 0, 0.1); */
  border-radius: var(--border-radius-30);
  display: flex;
  flex-direction: column;
  gap: 20px;
  h3 {
    font-size: var(--font-size-title-04);
  }
`;
const GroupContents = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  img {
    background-color: #ddd;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }
  & > span {
    padding: 5px 10px;
    background-color: #e3e6ea;
    border-radius: var(--border-radius-08);
    color: var(--color-facebookblue);
  }
  @media screen and (max-width: 768px) {
  }
`;
const GroupTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3px;
  h2 {
    font-size: var(--font-size-subtitle);
    font-weight: normal;
  }
  div {
    display: flex;
    justify-content: flex-start;
    gap: 4px;
    font-size: 14px;
    color: var(--color-gray-01);
  }
  @media screen and (max-width: 768px) {
    div {
      flex-direction: column;
      span {
        font-size: 12px;
      }
      span:nth-child(2) {
        display: none;
      }
    }
  }
`;
/* eslint-disable react/prop-types */
const SideBarGroup = ({ openGroup, closeModal }) => {
  const closeRef = useRef(null);

  const handleClickOutside = (event) => {
    if (closeRef.current && !closeRef.current.contains(event.target)) {
      closeModal();
    }
  };
  useEffect(() => {
    // 모달이 마운트되면 클릭 이벤트 추가
    document.addEventListener("click", handleClickOutside);

    return () => {
      // 모달이 언마운트되면 클릭 이벤트 제거
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <Wrapper ref={closeRef} onClick={(e) => e.stopPropagation()}>
      <TopTitle>
        <h2>회원님을 위한 커뮤니티</h2>
        <span>
          <IoClose onClick={openGroup} />
        </span>
      </TopTitle>
      <Title>
        <h3>추천그룹</h3>
      </Title>
      <Group>
        <GroupContents>
          <img />
          <GroupTitle>
            <h2>여행</h2>
            <div>
              <span>동영상 크리에이터</span>
              <span>・</span>
              <span>팔로워 10만명</span>
            </div>
          </GroupTitle>
          <span>팔로우</span>
        </GroupContents>
        <GroupContents>
          <img />
          <GroupTitle>
            <h2>여행</h2>
            <div>
              <span>동영상 크리에이터</span>
              <span>・</span>
              <span>팔로워 10만명</span>
            </div>
          </GroupTitle>
          <span>팔로우</span>
        </GroupContents>
        <GroupContents>
          <img />
          <GroupTitle>
            <h2>여행</h2>
            <div>
              <span>동영상 크리에이터</span>
              <span>・</span>
              <span>팔로워 10만명</span>
            </div>
          </GroupTitle>
          <span>팔로우</span>
        </GroupContents>
      </Group>
      <Title>
        <h3>추천페이지</h3>
      </Title>
      <Group>
        <GroupContents>
          <img />
          <GroupTitle>
            <h2>여행</h2>
            <div>
              <span>동영상 크리에이터</span>
              <span>・</span>
              <span>팔로워 10만명</span>
            </div>
          </GroupTitle>
          <span>팔로우</span>
        </GroupContents>
        <GroupContents>
          <img />
          <GroupTitle>
            <h2>여행</h2>
            <div>
              <span>동영상 크리에이터</span>
              <span>・</span>
              <span>팔로워 10만명</span>
            </div>
          </GroupTitle>
          <span>팔로우</span>
        </GroupContents>
        <GroupContents>
          <img />
          <GroupTitle>
            <h2>여행</h2>
            <div>
              <span>동영상 크리에이터</span>
              <span>・</span>
              <span>팔로워 10만명</span>
            </div>
          </GroupTitle>
          <span>팔로우</span>
        </GroupContents>
      </Group>
    </Wrapper>
  );
};

export default SideBarGroup;
