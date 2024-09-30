import React from 'react'
import styled from 'styled-components'

import testCat from '../../img/testcat.jpg';

import ProfileCard from './ProfileCard';

const Wrapper = styled.section`
  width:100%;
  height:575px;
  display:flex;
  justify-content: center;
  align-items: center;
  margin-bottom:140px;
  
`
const Inner = styled.article`
    width:1050px;
    height:100%;
`
const CoverImg =styled.img`
  position:relative;
  width:100%;
  height:550px;
  object-fit:cover;
  
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
