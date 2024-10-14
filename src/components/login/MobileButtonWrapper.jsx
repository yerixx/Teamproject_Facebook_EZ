import React from "react";
import {
  createSearchParams,
  Link,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import styled from "styled-components";
import { SubDescription_14_n } from "../../styles/GlobalStyles.styles";
import { Button } from "./login-components";

const Wrapper = styled.div`
  width: 100%;
  /* position: fixed;
  bottom: 0; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  /* padding: 15px;
  background: var(--color-white);
  border-top: 1px solid var(--color-light-gray-01); */
  button {
    width: 360px;
    max-width: 360px;
    &.mobileNextButton {
      border: 1px solid transparent;
      background: var(--color-facebookblue);
      color: var(--color-white);
      &:active {
        background: var(--color-hoverblue);
      }
    }
  }
  span {
    ${SubDescription_14_n}
    color: var(--color-gray-01);
    cursor: pointer;
  }
`;

const MobileButtonWrapper = ({ skipBtn }) => {
  const navigate = useNavigate();
  const handleSignupNextStep = () => {
    navigate({
      pathname: "/signup",
      search: `?${createSearchParams({
        progress: 2,
      })}`,
    });
  };

  return (
    <Wrapper>
      <Button onClick={handleSignupNextStep} className="mobileNextButton">
        다음
      </Button>
      {skipBtn ? <Button>건너뛰기</Button> : null}
      <Link to={"/login"}>
        <span>이미 계정이 있습니다</span>
      </Link>
    </Wrapper>
  );
};

export default MobileButtonWrapper;
