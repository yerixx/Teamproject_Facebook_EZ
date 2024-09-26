import React from 'react'
import styled from 'styled-components'
import testCat from '../../img/testcat.jpg';
import MypageProfile from './MypageProfile';

const Wrapper = styled.section`
  width:100%;
  height:fit-content;
  display:flex;
  justify-content: center;
  align-items: center;
`
const Inner = styled.article`
    width:1050px;
    height:100%;
    padding:0 90px;
`
const CoverImg =styled.img`
  position:relative;
  width:100%;
  height:375px;
  object-fit:cover;
  
`

const MypageCover = () => {
  return (
    <Wrapper>
      <Inner>
        <CoverImg src={testCat} alt="Test Cat"/>
        <MypageProfile />
      </Inner>
    </Wrapper>
  )
}

export default MypageCover
