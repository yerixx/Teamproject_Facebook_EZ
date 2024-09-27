import React from "react";
import MypageCont from "../components/detail/MypageCont";
import MypageUpload from "../components/detail/MypageUpload"
import MypageCover from "../components/detail/MypageCover";
import styled from "styled-components";

const Wrapper = styled.div`
  margin:0 auto;
  width:fit-content;
  box-shadow:var(--box-shadow-01);

  /* border:1px solid #f00; */
`
const Detail = () => {
  return <Wrapper>
    <MypageCover/>
    <MypageUpload placeholder="무슨생각을 하고 계신가요?" />
    <MypageCont />
    <MypageUpload />
  </Wrapper>;
};

export default Detail;
