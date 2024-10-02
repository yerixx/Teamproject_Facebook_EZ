import React from 'react'
import styled from 'styled-components'
import ProfileCard from './ProfileCard';

import testCat from '/img/testcat.jpg';


const Wrapper = styled.section`
  width:100%;
  height:575px;
  display:flex;
  justify-content: center;
  align-items: center;
  margin-bottom:140px;
   /* 미디어 쿼리 */
  @media (max-width: 768px) {
    /* border:1px solid #f00; */
    max-width: 100%;
    height:400px;
    margin-bottom:0;
  }
`
const Inner = styled.article`
    width:1050px;
    height:100%;
    /* 미디어 쿼리 */
    @media (max-width : 768px) {
      max-width: 100%;
  }
`
const CoverImg =styled.img`
  position:relative;
  width:100%;
  /* height 변경 금지 */
  height:550px;
  object-fit:cover;
    /* 미디어 쿼리 */
    @media (max-width : 768px) {
      width: 100%;
       height:300px;
  }
`

const TopCover = () => {
  return (
    <Wrapper>
      <Inner>
        <CoverImg src={testCat} alt="Test Cat"/>
        <ProfileCard />
      </Inner>
    </Wrapper>
  )
}

export default TopCover
