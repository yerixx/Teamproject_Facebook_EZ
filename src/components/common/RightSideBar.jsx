import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  right: 20px;
  width: 382px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #fff;
  padding: 28px 20px;
  border-radius: var(--border-radius-30);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
`;
const Title = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Wallet = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  h3 {
    font-size: var(--font-size-title-04);
  }
`;
const WalletItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  img {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--color-light-gray-01);
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const LeftSideBar = () => {
  return (
    <Wrapper>
      <Title>
        <h3>Wallett +</h3>
        <span>12,300p</span>
      </Title>
      <Wallet>
        <WalletItem>
          <img />
          <span>10,700 원</span>
        </WalletItem>
        <WalletItem>
          <img />
          <span>10,700 원</span>
        </WalletItem>
        <WalletItem>
          <img />
          <span>10,700 원</span>
        </WalletItem>
        <Title>
          <h3>최근 본 상품</h3>
        </Title>
      </Wallet>
    </Wrapper>
  );
};

export default LeftSideBar;
