import styled from "styled-components";
// import logoImg from "../../img/Logo.png";
import HeaderlogoImg from "../../img/HeaderLogo.svg";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { BsCollectionPlay } from "react-icons/bs";
import { AiOutlineShop } from "react-icons/ai";
import { IoPeopleOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";
import { FaBell } from "react-icons/fa";
import { FaMoon } from "react-icons/fa";
import { TbGridDots } from "react-icons/tb";

const Header = styled.div`
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 26px;
  }
`;
const HeaderSticky = styled.div`
  padding: 0 15px;
  width: 100%;
  height: 88px;
  background: var(--color-white);
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  -webkit-box-shadow: 0 4px 6px -6px #222;
  -moz-box-shadow: 0 4px 6px -6px #222;
  box-shadow: 0 4px 6px -6px #222;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  gap: 20px;
  img {
    height: 40px;
  }
  div {
    position: relative;
    svg {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
    input {
      width: 254px;
      height: 48px;
      border-radius: 140px;
      border: none;
      background-color: #e5e6eb;
      padding-left: 50px;
      font-size: 16px;
    }
  }
`;
const Center = styled.div`
  flex: 1.4;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  /* border: 1px solid #ddd; */
  height: 100%;
  div {
    cursor: pointer;
    width: 80px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 2.5px solid var(--color-facebookblue);
    svg {
      font-size: 24px;
    }
  }
`;
const Right = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  justify-content: flex-end;
  gap: 20px;
`;
const RightFirst = styled.div`
  width: 156px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  span {
    cursor: pointer;
    font-size: 14px;
    color: var(--color-facebookblue);
  }
`;
const ProfileWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  div {
    background: #999;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  h3 {
    font-size: var(--font-size-subtitle);
    font-weight: normal;
  }
`;

const RightSecond = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  svg {
    font-size: 18px;
  }
`;
const IconWrap = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-light-gray-01);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderTop1 = () => {
  return (
    <Header>
      <img src={HeaderlogoImg} alt="" />
    </Header>
  );
};

export const HeaderBottom1 = () => {
  return (
    <HeaderSticky>
      <Left>
        {/* <img src={logoImg} alt="" /> */}
        <div>
          <FaMagnifyingGlass />
          <input type="text" placeholder="Search Facebook" />
        </div>
      </Left>
      <Center>
        <div>
          <AiFillHome />
        </div>
        <div>
          <BsCollectionPlay />
        </div>
        <div>
          <AiOutlineShop />
        </div>
        <div>
          <IoPeopleOutline />
        </div>
      </Center>
      <Right>
        <RightFirst>
          <ProfileWrap>
            <div></div>
            <h3>박태환</h3>
          </ProfileWrap>
          <span>12,300p</span>
        </RightFirst>
        <RightSecond>
          <IconWrap>
            <TbGridDots />
          </IconWrap>
          <IconWrap>
            <FaBell />
          </IconWrap>
          <IconWrap>
            <FaMoon />
          </IconWrap>
          <IconWrap>
            <MdOutlineLogout />
          </IconWrap>
        </RightSecond>
      </Right>
    </HeaderSticky>
  );
};
