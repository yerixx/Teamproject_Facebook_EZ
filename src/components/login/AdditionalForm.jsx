import React from "react";
import styled from "styled-components";
import { SubDescription_16_n } from "../../styles/GlobalStyles.styles";
import {
  Form,
  Ul,
  InputWrapperRow,
  Input,
  FormTitle,
  FormItemTitle,
  FormItemDesc,
  Pager,
  Button,
} from "./login-components";

const Wrapper = styled.div`
  padding: 25px;
  background: var(--color-light-gray-02);
  box-shadow: var(--box-shadow-02);
  border-radius: var(--border-radius-08);
`;
const Label = styled.label`
  display: inline-block;
  width: 210px;
  height: 46px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 15px;
  border: 1px solid var(--color-gray-02);
  border-radius: var(--border-radius-08);
  background: var(--color-white);
  ${SubDescription_16_n}
`;
const Select = styled.select`
  width: 430px;
  padding: 10px 15px;
  border: 1px solid var(--color-gray-02);
  border-radius: var(--border-radius-08);
  ${SubDescription_16_n}
  &:focus {
    outline: none;
  }
`;

const AdditionalForm = () => {
  return (
    <Wrapper>
      <Form height={700}>
        <FormTitle>회원님을 위한 맞춤 홈피드를 준비할게요</FormTitle>
        <Ul>
          <li>
            <FormItemTitle>성별 입력</FormItemTitle>
            <FormItemDesc>
              언제든지 프로필에서 회원님의 성별을 변경할 수 있습니다.
            </FormItemDesc>
            <InputWrapperRow>
              <Label htmlFor="woman">
                여성
                <Input name="gender" type="radio" value="female" id="woman" />
              </Label>
              <Label htmlFor="man">
                남성
                <Input name="gender" type="radio" value="male" id="man" />
              </Label>
            </InputWrapperRow>
          </li>
          <li>
            <FormItemTitle>생년월일 입력</FormItemTitle>
            <FormItemDesc>
              생년월일을 선택하세요. <br />
              언제든지 비공개로 변경할 수 있습니다.
            </FormItemDesc>
            <Input id="birth" name="birth" type="date" width={430} />
          </li>
          <li>
            <FormItemTitle>지역 입력</FormItemTitle>
            <FormItemDesc>
              지역을 선택하세요. <br />
              언제든지 비공개로 변경할 수 있습니다.
            </FormItemDesc>
            <Select name="location" id="location">
              <option value="select">지역</option>
              <option value="seoul">서울</option>
              <option value="gyeonggi">경기</option>
              <option value="daegu">대구</option>
              <option value="busan">부산</option>
              <option value="etc">기타</option>
            </Select>
          </li>
        </Ul>
        <div>
          <Pager>
            <span className="active"></span>
            <span></span>
          </Pager>
          <Button>다음</Button>
        </div>
      </Form>
    </Wrapper>
  );
};

export default AdditionalForm;
