import React from 'react'
import styled from 'styled-components'

import {Paragraph_20_n} from '../../styles/GlobalStyles.styles.js';

// react-icon
import { FaRegHeart , FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FiShare } from "react-icons/fi";

const SocialIcon = styled.div`
  ${Paragraph_20_n}
  display:flex;
  justify-content: space-between;
  align-items: center;
  width:100%;
  height:80px;
  padding:0 10px 20px;
  border-bottom:1px solid var(--color-light-gray-01);
  .socialIcon{
    ${Paragraph_20_n}
    cursor: pointer;
    display: flex;
    align-items: center;
    gap:10px;
      /* 미디어 쿼리 */
      @media (max-width : 768px) {
        width:50%;
        justify-content: center;
        margin-right:20px;
        font-size:24px;
        color:var(--color-gray-01);
        /* border:1px solid #f00; */
        &:last-child{
          margin-right:0px;
        }
    }
    &:hover{
      color:var(--color-facebookblue);
    }
    .socialIconText{
     /* 미디어 쿼리 */
     @media (max-width : 768px) {
      display: none;
     }
    }
  }
`

const SocialBtnIcon = () => {
  return (
          <SocialIcon>
            <div className='socialIcon'>
              <FaRegHeart/>
              <div className='socialIconText'>좋아요</div>
            </div>
            <div className='socialIcon'>
              <FaRegComment/>
              <div className='socialIconText'>댓글</div>
            </div>
            <div className='socialIcon'>
              <FiShare/>
              <div className='socialIconText'>공유하기</div>
            </div>
            <div className='socialIcon'>
              <FaRegBookmark/>
              <div className='socialIconText'>저장하기</div>
            </div>
          </SocialIcon>
  )
}

export default SocialBtnIcon
