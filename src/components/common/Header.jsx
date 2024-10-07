// import { AiFillHome } from "react-icons/ai";
import { AiOutlineShop } from "react-icons/ai";
import { BsCollectionPlay } from "react-icons/bs";
import { FaBell, FaMoon } from "react-icons/fa";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";

import { IoPeopleOutline } from "react-icons/io5";
import { MdOutlineLogout } from "react-icons/md";

import { TbGridDots } from "react-icons/tb";
import { FaSearch } from "react-icons/fa";
import mobileLogo from "../../img/Logo.png";
import SideBarMenu from "./SideBarMenu";
import { useContext, useEffect, useState } from "react";
import SideBarGroup from "./SideBarGroup";
import SideBarWallet from "./SideBarWallet";
import { DataStateContext } from "../../App";
import HeaderlogoImg from "../../img/HeaderLogo.svg";
import styled from "styled-components";

const Header = styled.div`
  background-color: var(--color-white);
  z-index: 100;
  width: 100%;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 26px;
  }
  z-index: 5;
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const HeaderSticky = styled.div`
  background-color: var(--color-white);
  z-index: 100;
  padding: 0 15px;
  width: 100%;
  height: 88px;
  background: var(--color-white);
  display: flex;
  align-items: center;
  top: 0;
  left: 0;
  position: ${(prop) => (prop.isSticky ? "fixed" : "relative")};
  -webkit-box-shadow: 0 4px 6px -6px #222;
  -moz-box-shadow: 0 4px 6px -6px #222;
  box-shadow: 0 4px 6px -6px #222;
  margin-bottom: 20px;
  @media screen and (max-width: 1050px) {
    justify-content: center;
  }
  @media screen and (max-width: 768px) {
    position: fixed;
    height: 60px;
  }
`;

const Left = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
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
  .mobileLogo {
    display: none;
  }
  @media screen and (max-width: 1050px) {
    div {
      input {
        width: 220px;
      }
    }
  }
  @media screen and (max-width: 768px) {
    div {
      display: none;
    }
    .mobileLogo {
      display: block;
    }
  }
`;
const Center = styled.div`
  display: flex;
  align-items: center;
  position: absolute;
  gap: 10px;
  left: 50%;
  transform: translateX(-50%);
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
  @media screen and (max-width: 1050px) {
    /* gap: 0; */
    div {
      width: 50px;
    }
  }
  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const Right = styled.div`
  width: 500px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 15px;
  @media screen and (max-width: 1050px) {
    justify-content: flex-end;
  }
`;
const RightFirst = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  span {
    cursor: pointer;
    font-size: 14px;
    color: var(--color-facebookblue);
  }
  @media screen and (max-width: 1050px) {
    width: 20px;
    h3 {
      display: none;
    }
    span {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    /* display: none; */
  }
`;
const ProfileWrap = styled.div`
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  div {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    img {
      object-fit: cover;
      object-position: center;
      width: 100%;
      height: 100%;
    }
  }
  h3 {
    font-size: var(--font-size-subtitle);
    font-weight: normal;
  }
  @media screen and (max-width: 1050px) {
    width: 100px;
    justify-content: flex-end;
    div {
    }
  }
`;

const RightSecond = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  svg {
    font-size: 18px;
  }
  & > div:nth-child(1) {
    display: none;
  }
  @media screen and (max-width: 768px) {
    & > div:nth-child(1) {
      display: flex;
    }
    & > div:nth-child(2) {
    }
    & > div:nth-child(3) {
      display: none;
    }
    & > div:nth-child(4) {
    }
    & > div:nth-child(5) {
      display: none;
    }
  }
`;
const IconWrap = styled.div`
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: var(--color-light-gray-01);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const HeaderTop = () => {
  return (
    <Header>
      <img src={HeaderlogoImg} alt="" />
    </Header>
  );
};

export const HeaderBottom = () => {
  const data = useContext(DataStateContext);
  const currentUser = data.currentUserData;

  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  const [sideBarGroupOpen, setSideBarGroupOpen] = useState(false);
  const [sideWalletOpen, setSideWalletOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // 스크롤 위치 감지 및 상태 업데이트
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        // 스크롤 위치가 100px 이상일 때 고정
        setIsSticky(true);
      } else {
        // 스크롤 위치가 100px 이하일 때 원래 상태로
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const sideMenu = (e) => {
    e.stopPropagation();
    setSideMenuOpen((prev) => !prev);
    setSideBarGroupOpen(false);
    setSideWalletOpen(false);
  };
  const sideGroup = (e) => {
    e.stopPropagation();
    setSideBarGroupOpen((prev) => !prev);
    setSideMenuOpen(false);
    setSideWalletOpen(false);
  };

  const sideWallet = (e) => {
    e.stopPropagation();
    setSideWalletOpen((prev) => !prev);
    setSideMenuOpen(false);
    setSideBarGroupOpen(false);
  };
  const closeModal = () => {
    setSideMenuOpen(false);
    setSideBarGroupOpen(false);
    setSideWalletOpen(false);
  };

  return (
    <HeaderSticky isSticky={isSticky}>
      <Left>
        <img className="mobileLogo" src={mobileLogo} alt="mobileLogo" />
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
        <RightFirst onClick={sideWallet}>
          <ProfileWrap>
            <div>
              <img src="/img/testcat.jpg" alt="" />
            </div>
            <h3>
              {currentUser?.userName.fistName}
              {currentUser?.userName.lastName}
            </h3>
          </ProfileWrap>
          <span>{currentUser?.wallet.point}p</span>
        </RightFirst>
        <RightSecond>
          <IconWrap>
            <FaSearch />
          </IconWrap>
          <IconWrap onClick={sideMenu}>
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
      {sideMenuOpen && (
        <SideBarMenu openGroup={sideGroup} closeModal={closeModal} />
      )}
      {sideBarGroupOpen && (
        <SideBarGroup openGroup={sideGroup} closeModal={closeModal} />
      )}
      {sideWalletOpen && (
        <SideBarWallet onClick={sideWallet} closeModal={closeModal} />
      )}
    </HeaderSticky>
  );
};
