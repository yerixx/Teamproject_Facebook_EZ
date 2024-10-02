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
  margin: 40px 0;
  border: 1px solid #f0f;
  .profile_img {
    width: 110px;
    height: 110px;
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
      ${MainTitle_26_b}
      color:var(--color-gray-01);
    }
    .last_time {
      ${MainTitle_18_n}
      color:var(--color-gray-02);
    }
  }
`;

const TopProfile = () => {
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

export default TopProfile;
