import styled from "styled-components";
import checkImg from "../../img/check.svg";
import {
  MainTitle_24_m,
  Paragraph_20_n,
  SubDescription_16_n,
  MainTitle_18_b,
} from "../../styles/GlobalStyles.styles";

// Common
export const Logo = styled.div`
  height: 30px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
export const Button = styled.button`
  width: 430px;
  padding: 10px 15px;
  ${MainTitle_18_b};
  letter-spacing: -1px;
  border: 1px solid var(--color-gray-01);
  border-radius: var(--border-radius-08);
  background: var(--color-white);
  color: var(--color-gray-01);
  cursor: pointer;
  transition: all 0.3s;
  &:hover,
  &:active {
    border: 1px solid var(--color-facebookblue);
    color: var(--color-facebookblue);
  }
`;

// Layout
export const Inner = styled.article`
  width: 1050px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  align-items: center;
`;
export const FormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 60px 40px;
  background: var(--color-white);
  border-radius: var(--border-radius-30);
  box-shadow: var(--box-shadow-02);
`;

// Form Items
export const Form = styled.form`
  width: 430px;
  height: ${({ height }) => `${height}px`};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Ul = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;
  margin-bottom: 20px;
  li {
    p {
      margin: 8px 0 10px;
    }
  }
`;
export const InputWrapperColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;
export const InputWrapperRow = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const Input = styled.input`
  width: ${({ width }) => `${width}px`};
  height: 46px;
  padding: 10px 15px;
  border: 1px solid var(--color-gray-02);
  border-radius: var(--border-radius-08);
  ${SubDescription_16_n}
  /* color: var(--color-gray-02); */
transition: box-shadow 0.3s;
  &::placeholder {
    color: var(--color-gray-02);
    opacity: 1;
    transition: opacity 0.3s;
  }
  &:focus {
    box-shadow: var(--box-shadow-02);
    outline: none;
    &::placeholder {
      opacity: 0;
    }
  }
  &[type="submit"] {
    ${MainTitle_18_b}
    font-weight: 500;
    border: 1px solid transparent;
    background: var(--color-facebookblue);
    color: var(--color-white);
    cursor: pointer;
    transition: opacity 0.3s;
    &:hover {
      opacity: 0.8;
    }
  }
  &[type="radio"] {
    appearance: none;
    width: 20px;
    height: 20px;
    padding: 0;
    border-radius: 50%;
    border: 2px solid var(--color-gray-02);
    &:checked {
      background: url(${checkImg}) center/contain no-repeat;
    }
  }
  &[type="date"] {
    /* color: var(--color-gray-02); */
  }
`;

export const FormTitle = styled.h3`
  ${MainTitle_24_m}
  text-align: center;
  margin-bottom: 10px;
`;
export const FormDesc = styled.p`
  ${MainTitle_18_b}
  font-weight: 500;
  color: var(--color-gray-01);
  text-align: center;
`;
export const FormItemTitle = styled.h5`
  ${Paragraph_20_n}
`;
export const FormItemDesc = styled.p`
  ${SubDescription_16_n}
  color: var(--color-gray-01);
`;
export const Pager = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  margin-bottom: 20px;
  span {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 2px solid transparent;
    background: var(--color-gray-02);
    cursor: pointer;
    transition: all 0.3s;
    &.active {
      border: 2px solid var(--color-gray-01);
      background: var(--color-white);
    }
  }
`;
