import React from 'react'
import styled from 'styled-components'
//font
import { MainTitle_26_b,Paragraph_20_n,MainTitle_18_b,MainTitle_18_n ,SubDescription_16_n} from '../../styles/GlobalStyles.styles.js';

const Wrapper = styled.section`
  z-index:1;
  position: absolute;
  top:-100px;
  width:100%;
  height:400px;
  display:flex;
  justify-content: center;
  align-items: center;
  position:relative;
  padding:0 90px;
  background:var(--color-white);
  border-radius:30px 30px 0 0;
  border:1px solid  #f00;
  `
const Profile = styled.div`
  width:100%;
`

const MypageProfile = () => {
  return (
    <Wrapper>
        <Profile></Profile>
    </Wrapper>
  )
}

export default MypageProfile
