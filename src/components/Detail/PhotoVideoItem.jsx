import React from 'react'
import styled from 'styled-components'
import SocialBtnIcon from './SocialBtnIcon.jsx';


import testCat from '../../img/testcat.jpg';

//font
import { MainTitle_22_b,MainTitle_18_n} from '../../styles/GlobalStyles.styles.js';


const Inner = styled.article`
    display:flex;
    justify-content: center;
    align-items: center;
    width:415px;
    height:485px;
  
`
const Contents = styled.div`
    border:1px solid var(--color-light-gray-02);
    border-radius: var(--border-radius-08);
    box-shadow:var(--box-shadow-01);
  
`
const ContImg = styled.img`
  width:415px;
  height:340px;
  object-fit:cover;
  /* border-radius: 8px 8px 0 0 ; */
`
const ContText = styled.div`
  display: flex;
  flex-direction:column;
  gap:10px;
  padding:26px 30px 30px;
  .contTitle{
    ${MainTitle_22_b}
  }
  .contDesc{
    ${MainTitle_18_n}
    color:var(--color-gray-02);
  }
      /* 미디어 쿼리 */
      @media (max-width : 768px) {
      width:100%;
    }
`

const PhotoVideoItem = ({title,desc, imageSrc}) => {
  return (
      <Inner>
        <Contents>
         <ContImg src={imageSrc || testCat} alt='contentImage' />
          <ContText>
            <div className='contTitle'>{title || "Summer~ ✨"}</div>
            <div className='contDesc'>{desc || "18 Image"} </div>
          </ContText>
          <SocialBtnIcon/>
      </Contents>
    </Inner>
  )
}

export default PhotoVideoItem
  