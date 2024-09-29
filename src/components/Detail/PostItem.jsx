import React from 'react'

// react-icon
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart , FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { FiShare } from "react-icons/fi";
import { IoCloseOutline } from "react-icons/io5";
import { SlArrowDown } from "react-icons/sl";
import styled from 'styled-components'

//font
import { MainTitle_26_b,Paragraph_20_n,MainTitle_18_b,MainTitle_18_n ,SubDescription_16_n} from '../../styles/GlobalStyles.styles.js';
import PostInputField from "../detail/PostInputField"
import { useState } from 'react';

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
const Profile = styled.div`
    display: flex;
    align-items: center;
    justify-content:space-between;
    .profileContent{
      display: flex;
      align-items: center;
      gap:30px;
    .profileImg{
      width:80px;
      height:80px;
      background:var(--color-gray-01);
      border-radius:100px;
      }
    .profileName{
      ${MainTitle_26_b}
      color:var(--color-gray-01);
    }
    .profileDesc{
      ${Paragraph_20_n}
      padding:4px 0;
      color:var(--color-gray-02);
      }
    }
    .ControlsIcon{
      display:flex;
      gap:17px;
      font-size:40px;
      color:var(--color-gray-01);
      cursor: pointer;
      transition: opacity 0.5s;
      *:hover{
        opacity:0.8;
      }
    }
`
const Contents = styled.div`
position:relative;
padding:30px 0 0;
.contentDesc{
  ${MainTitle_18_b};
  font-weight: normal;
  word-break: break-all;
}
.contentImgs{
  display: flex;
  justify-content:space-between;
  padding:30px 0;
}
.Buttons{
  width:100%;
  display: flex;
  justify-content:space-between;
  position:absolute;
  top:55%;
  .btnLeft,.btnRight{
    padding:20px 23px;;
    font-size:20px;
    background:var(--color-light-gray-02);
    border-radius:50%;
    transition:opacity 0.5s;
    cursor: pointer;
    &:hover{
      opacity:0.5;
    }
  }
  .btnLeft{
    transform:translateX(-30px)
  }
  .btnRight{
    transform:translateX(30px)
  }

}
`
const ContImg = styled.img`
    margin:30px 0;
    width:850px;
    height:400px;
    background:var(--color-light-gray-01);
    object-fit:cover;
`
const SocialBtnIcon = styled.div`
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
    &:hover{
      color:var(--color-facebookblue);
    }
  }
`
const CommentTop = styled.div`
  ${Paragraph_20_n}
  padding:40px 0;
  display:flex;
  justify-content:space-between;
  .commentTopRight{
    display:flex;
    align-items: center;
    gap:10px;
    .SlArrowDown{
     ${SubDescription_16_n}
      cursor: pointer;
    }
  }

`
const CommentLists = styled.div`
  ${MainTitle_18_n}
  display: flex;
  flex-direction:column;
  gap:30px;
  .commentList{
    display: flex;
    align-items: center;
    gap:30px;
    .commentFirstImg{
      width:60px;
      height:60px;
      background: var(--color-light-gray-01);
      border-radius:50%;
    }
    .commentFirstDesc{
      display: flex;
      flex-direction:column;
      gap:10px;
      .firstDescTop{
        display: flex;
        flex-direction:column;
        gap:10px;
        position: relative;
        background: var(--color-light-gray-01);
        border-radius: 8px;
        padding: 14px 20px;
        width: fit-content;
        height:fit-content;
        color: black; 
        &:after {
          content: '';
        position: absolute;
        bottom: -5px;
        left: -10px; 
        width: 30px; 
        height: 12px;
        background: var(--color-light-gray-01);;
        border-radius: 0 15px 0 20px ;
        transform: rotate(-30deg); 
      }
      }
      .firstDescBottom{
        display: flex;
        gap:10px;
        padding:0 20px;
        color:var(--color-gray-02);
        cursor: pointer;
        transition: color 0.5s;
        *:hover{
        color:var(--color-black);
        }

      }
    }
    .commentSecImg{
      width:60px;
      height:60px;
      background: var(--color-light-gray-01);
      border-radius:50%;
    }
    .commentSecDesc{
      display: flex;
      flex-direction:column;
      gap:10px;
      .secDescTop{
        margin-top:30px;
        display: flex;
        gap:5px;
        position: relative;
        border: 1px solid var(--color-light-gray-01);
        background: var(--color-white);
        border-radius: 8px;
        padding: 14px 20px;
        width: fit-content;
        height:fit-content;
        color: black; 
        &:after {
          content: '';
        position: absolute;
        top: -4px;
        left: -10px; 
        width: 30px; 
        height: 14px;
        border-left: 1px solid var(--color-light-gray-01);
        border-top: 1px solid var(--color-light-gray-01);
        background: var(--color-white);
        border-radius: 0 0 0 60px ;
        transform: rotate(10deg); 
        }
      }
      .secDescBottom{
        display: flex;
        gap:10px;
        padding:0 20px;
        color:var(--color-gray-02);
        cursor: pointer;
        transition: color 0.5s;
        *:hover{
        color:var(--color-black);
        }
      }
    }
  }
  
`


const PostItem = ({imageSrc,contentDesc}) => {
  return (
      <Wrapper>
        <Inner>
          <Profile>
            <div className='profileContent' >
              <div className='profileImg'></div>
              <div className='profileText'>
                <h1 className='profileName'>박예림</h1>
                <p className='profileDesc'> 8시간전</p>
              </div>
            </div>
            <div className='ControlsIcon'>
              <div><BsThreeDots /></div>
              <div><IoCloseOutline /></div>
            </div>
          </Profile>
          <Contents>
            <div className='contentDesc'>
              {contentDesc || "우리의 여행 sub folder만 몇 개인지 모르겠다. "}
            </div>
            {imageSrc && <ContImg src={imageSrc} alt={"Content Image"}/>}
          </Contents>
          <SocialBtnIcon>
            <div className='socialIcon'>
              <FaRegHeart/>좋아요
            </div>
            <div className='socialIcon'>
              <FaRegComment/>댓글
            </div>
            <div className='socialIcon'>
              <FiShare/>공유하기
            </div>
            <div className='socialIcon'>
              <FaRegBookmark/>저장하기
            </div>
          </SocialBtnIcon>
          <CommentTop>
                <div>총 29개의 댓글</div>
                 <div className='commentTopRight'>
                  <div>최신순</div>
                  <div><SlArrowDown className='SlArrowDown' /></div>
                </div>
          </CommentTop>
          <CommentLists>
            <div className='commentList'>
              <div className='commentFirstImg'>
              </div>
              <div className='commentFirstDesc'>
                <div className='firstDescTop'>
                  <b>김예지</b>
                  <span>
                    <b>김정하</b> <span>여기 가보는 거 어때?</span>
                  </span>
                </div>
                <div className='firstDescBottom'>
                  <div>좋아요</div>
                  <div>답글달기</div>
                </div>
              </div>
            </div>
            <div className='commentList'>
              <div className='commentSecImg'>
              </div>
              <div className='commentSecDesc'>
                <div className='secDescTop'>
                  <b>김정하</b> <span>완전 좋아요!!</span>
                </div>
                <div className='secDescBottom'>
                  <div>좋아요</div>
                  <div>답글달기</div>
                </div>
            </div>
            </div>
          </CommentLists>
          <PostInputField />
        </Inner>
      </Wrapper>
  )
}

export default PostItem
