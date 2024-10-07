import styled from "styled-components";
import { MdOutlineShoppingBag } from "react-icons/md";
import { SubTitle_16_b } from "../../styles/GlobalStyles.styles";
import { IoClose } from "react-icons/io5";
import { useContext, useEffect, useRef } from "react";
import { DataStateContext } from "../../App";

const Wrapper = styled.div`
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
const Title = styled.div`
  display: flex;
  justify-content: space-between;
  span {
    cursor: pointer;
  }
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  h3 {
    font-size: var(--font-size-title-04);
  }
`;
const WalletItem = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  img,
  div {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: var(--color-light-gray-01);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  div {
    color: var(--color-facebookblue);
    font-size: 30px;
  }
`;

const RecentProductItem = styled.div`
  padding: 0 10px;
  background: var(--color-light-gray-02);
  width: 347px;
  height: 90px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: 10px;
  img {
    min-width: 60px;
    height: 60px;
    background: #ddd;
    border-radius: 10px;
  }
  .icon {
    min-width: 45px;
    height: 45px;
    display: flex;
    justify-content: center;
    background-color: var(--color-white);
    border-radius: 50%;
    align-items: center;
    svg {
      font-size: 30px;
    }
  }
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;
const ProductItemInfo = styled.div`
  width: 180px;
  display: flex;
  flex-direction: column;
  h4 {
    ${SubTitle_16_b}
  }
  div {
    font-weight: bold;
    display: flex;
    gap: 10px;
    span:nth-child(1) {
      color: red;
    }
    span:nth-child(2) {
      color: var(--color-gray-01);
    }
  }
`;
/* eslint-disable react/prop-types */
const SideBarWallet = ({ onClick, closeModal }) => {
  const data = useContext(DataStateContext);
  const currentUser = data.currentUserData;
  const closeRef = useRef(null);
  const handleClickOutside = (event) => {
    if (closeRef.current && !closeRef.current.contains(event.target)) {
      closeModal(); // 모달을 닫는 함수 호출
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
      <Title>
        <h3>Wallett +</h3>
        <span>
          <IoClose onClick={onClick} />
        </span>
      </Title>
      <Box>
        <WalletItem>
          <img />
          <span>{currentUser.wallet.point} p</span>
        </WalletItem>
        <WalletItem>
          <img />
          <span>{currentUser.wallet.wan} 원</span>
        </WalletItem>
        <WalletItem>
          <div>+</div>
          <span>지갑 추가</span>
        </WalletItem>
      </Box>
      <Title>
        <h3>최근 본 상품</h3>
      </Title>
      <Box>
        <RecentProductItem>
          <img />
          <ProductItemInfo>
            <h4>★5%추가할인★스프라이트 백트임 긴팔니트..</h4>
            <div>
              <span>30%</span>
              <span>19,000원</span>
            </div>
          </ProductItemInfo>
          <div className="icon">
            <MdOutlineShoppingBag />
          </div>
        </RecentProductItem>
        <RecentProductItem>
          <img />
          <ProductItemInfo>
            <h4>★5%추가할인★스프라이트 백트임 긴팔니트..</h4>
            <div>
              <span>30%</span>
              <span>19,000원</span>
            </div>
          </ProductItemInfo>
          <div className="icon">
            <MdOutlineShoppingBag />
          </div>
        </RecentProductItem>
        <RecentProductItem>
          <img />
          <ProductItemInfo>
            <h4>★5%추가할인★스프라이트 백트임 긴팔니트..</h4>
            <div>
              <span>30%</span>
              <span>19,000원</span>
            </div>
          </ProductItemInfo>
          <div className="icon">
            <MdOutlineShoppingBag />
          </div>
        </RecentProductItem>
      </Box>
    </Wrapper>
  );
};

export default SideBarWallet;
