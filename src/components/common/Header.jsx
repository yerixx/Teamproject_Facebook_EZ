import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

const Wrapper = styled.div`
  height: 80px;
  border: 1px solid #999;
  padding: 15px;
  display: flex;
  @media screen and (max-width: 1050px) {
    background-color: #ddd;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;

  gap: 20px;
  div {
    position: relative;
    .glass {
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
  flex: 1.5;
  border: 1px solid #999;
`;
const Right = styled.div`
  flex: 1;
  border: 1px solid #999;
`;

const Header = () => {
  return (
    <Wrapper>
      <Left>
        <img />
        <div>
          {/* <FontAwesomeIcon className="glass" icon={faMagnifyingGlass} /> */}
          <input type="text" placeholder="Search Facebook" />
        </div>
      </Left>
      <Center></Center>
      <Right></Right>
    </Wrapper>
  );
};

export default Header;
