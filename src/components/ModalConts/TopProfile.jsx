import React from "react";
import styled from "styled-components";

/*STYLED*/
const Wrapper = styled.div`
  display: flex;
  gap: 22px;
  justify-content: center;
  align-items: center;
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
