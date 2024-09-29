import styled from "styled-components";
import {
  MainTitle_18_n,
  MainTitle_22_b,
} from "../../styles/GlobalStyles.styles";
import { IoClose } from "react-icons/io5";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const Inner = styled.div`
  width: 1000px;
  padding: 27px 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  border-radius: var(--border-radius-08);
  position: relative;
`;
const Title = styled.div`
  h2 {
    ${MainTitle_22_b}
    margin-bottom: 5px;
  }
  span {
    ${MainTitle_18_n}
    color: var(--color-gray-01);
  }
`;
const Items = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  gap: 10px;
`;

const Item = styled.div`
  width: 100%;
  height: 320px;
  background: #999;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  position: relative;
  svg {
    position: absolute;
    top: 12px;
    right: 12px;
    font-size: 40px;
    font-weight: bold;
    color: #fff;
    background-color: var(--color-light-gray-01);
    border-radius: 50%;
  }
  div {
    background: var(--color-light-gray-02);
    padding: 10px 20px;
    height: 130px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    h3 {
      ${MainTitle_18_n}
    }
    h4 {
      font-size: 14px;
      font-weight: normal;
      margin-bottom: 10px;
    }
    span {
      font-size: 14px;
      font-weight: normal;
      margin-bottom: 10px;
      padding: 10px;
      background-color: var(--color-light-gray-01);
      text-align: center;
      border-radius: 8px;
    }
  }
`;

const MainGroup = () => {
  return (
    <Wrapper>
      <Inner>
        <Title>
          <h2>회원님을 위한 추천 그룹</h2>
          <span>회원님이 관심을 가질만한 그룹입니다.</span>
        </Title>
        <Items>
          <Item>
            <IoClose />
            <div>
              <h3>함께하는 세계여행</h3>
              <h4>멤버 4.4천명</h4>
              <span>그룹 가입</span>
            </div>
          </Item>
          <Item>
            <IoClose />
            <div>
              <h3>반려동물</h3>
              <h4>멤버 2.4천명</h4>
              <span>그룹 가입</span>
            </div>
          </Item>
          <Item>
            <IoClose />
            <div>
              <h3>운동</h3>
              <h4>멤버 3.2천명</h4>
              <span>그룹 가입</span>
            </div>
          </Item>
        </Items>
      </Inner>
    </Wrapper>
  );
};

export default MainGroup;
