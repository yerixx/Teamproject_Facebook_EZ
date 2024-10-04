import React from "react";
import styled from "styled-components";
import {
  MainTitle_26_b,
  MainTitle_18_n,
} from "../../styles/GlobalStyles.styles";

/*STYLED*/
const Wrapper = styled.div`
  display: flex;
  gap: 22px;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 46px;
  margin-left: 19px;
  border: 1px solid #f0f;
  width: 200px;
  .profile_img {
    width: 50px;
    height: 50px;
    border: 1px solid #f00;
    border-radius: 50%;
    img {
      width: 100%;
    }
  }
  .profile_name {
    display: flex;
    flex-direction: column;
    .name {
      font-size: 18px;
      color: var(--color-gray-01);
    }
    .last_time {
      font-size: 14px;
      color: var(--color-gray-02);
    }
  }
`;

const TopProfileMob = () => {
  return (
    <Wrapper>
      <div className="profile_img">
        <img src="" alt="" />
      </div>
      <div className="profile_name">
        <div className="name">Name</div>
        <div className="last_time">Time</div>
      </div>
    </Wrapper>
  );
};

export default TopProfileMob;
