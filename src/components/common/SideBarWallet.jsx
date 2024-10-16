import styled from "styled-components";
import { MdOutlineShoppingBag } from "react-icons/md";
import { SubTitle_16_b } from "../../styles/GlobalStyles.styles";
import { IoClose } from "react-icons/io5";
import { useContext, useEffect, useRef } from "react";
import { DataStateContext } from "../../App";
import { motion } from "framer-motion";

const Wrapper = styled(motion.div)`
  z-index: 3;
  position: absolute;
  top: 100px;
  right: 20px;
  width: 382px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: ${(props) => props.theme.ContainColor};
  padding: 28px 20px;
  border-radius: var(--border-radius-30);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.1);
  max-height: 80vh;
  overflow-y: auto;
  -ms-overflow-style: none;
  scrollbar-width: none;
  @media screen and (max-width: 1050px) {
    right: 10px;
  }
  @media screen and (max-width: 768px) {
    width: 330px;
    top: 70px;
  }
`;
const Title = styled.div`
  color: ${(props) => props.theme.textColor};
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
  color: ${(props) => props.theme.textColor};
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
  background: ${(props) => props.theme.cardColor};
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
    color: ${(props) => props.theme.textColor};
  }
  div {
    font-weight: bold;
    display: flex;
    gap: 10px;
    span:nth-child(1) {
      color: red;
    }
    span:nth-child(2) {
      color: ${(props) => props.theme.subTextColor};
    }
  }
`;

const SideBarWallet = ({ onClick, closeModal }) => {
  const data = useContext(DataStateContext);
  const points = data?.points || 0;
  const liveCommerce = data?.liveCommerce || [];
  const { currentUserData } = useContext(DataStateContext);

  const closeRef = useRef(null);
  const handleClickOutside = (event) => {
    if (closeRef.current && !closeRef.current.contains(event.target)) {
      closeModal(); // 모달을 닫는 함수 호출
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  if (!data) {
    return <div>로딩 중...</div>; // 데이터가 로드되지 않았을 때 로딩 상태를 표시
  }

  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      ref={closeRef}
      onClick={(e) => e.stopPropagation()}
    >
      <Title>
        <h3>Wallett +</h3>
        <span>
          <IoClose onClick={onClick} />
        </span>
      </Title>
      <Box>
        <WalletItem>
          <img src="https://www.pngplay.com/wp-content/uploads/5/Alphabet-P-PNG-Pic-Background.png" />
          <span>{currentUserData.wallet.point}p </span>
        </WalletItem>
        <WalletItem onClick={() => alert("서비스 준비중 입니다")}>
          <div>+</div>
          <span>지갑 추가</span>
        </WalletItem>
      </Box>
      <Title>
        <h3>최근 본 상품</h3>
      </Title>
      <Box>
        {liveCommerce.length > 0 ? (
          liveCommerce.map((liveItem) =>
            liveItem?.products?.map((product) => (
              <RecentProductItem key={product.id}>
                <img src={product?.productImage} alt={product.name} />
                <ProductItemInfo>
                  <h4>{product?.name}</h4>
                  <div>
                    <span>{product?.discountRate}</span>
                    <span>{product?.discountPrice}</span>
                  </div>
                </ProductItemInfo>
                <div className="icon">
                  <MdOutlineShoppingBag />
                </div>
              </RecentProductItem>
            ))
          )
        ) : (
          <div style={{ color: "${(props) => props.theme.textColor}" }}>
            최근 본 상품이 없습니다.
          </div>
        )}
      </Box>
    </Wrapper>
  );
};

export default SideBarWallet;
