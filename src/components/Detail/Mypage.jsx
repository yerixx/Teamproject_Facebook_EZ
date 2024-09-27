import React from 'react'
import styled from 'styled-components'

// react-icon
import { IoCloseOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa6";
import { SlArrowDown } from "react-icons/sl";
import { CiCamera } from "react-icons/ci";

const Wrapper = styled.section`
width:100%;
height:100vh;
display:flex;
justify-content: center;
align-items: center;
border:1px solid #f00;
`
const Inner = styled.article`
    width:1050px;
    height:100%;
    border:1px solid #f00;
    padding:75px 90px;
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
      width:120px;
      height:120px;
      background:var(--color-gray-01);
      border-radius:100px;
      }
    .profileName{
      font-size:var(--font-size-header-02);
      color:var(--color-gray-01);
    }
    .profileDesc{
      padding:4px 0;
      font-size:var(--font-size-paragraph);
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
  font-size:var(--font-size-paragraph);
  word-break: break-all;
}
.contentImgs{
  display: flex;
  justify-content:space-between;
  padding:30px 0;
  .contentImg {
    width:850px;
    height:340px;
    background:var(--color-light-gray-01);
  }
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
const SocialBtnIcon = styled.div`
  display:flex;
  justify-content: space-between;
  align-items: center;
  width:100%;
  height:80px;
  padding:0 10px 20px;
  font-size:var(--font-size-paragraph);
  border-bottom:1px solid var(--color-light-gray-01);
  .socialIcon{
    font-size:var(--font-size-paragraph);
    cursor: pointer;
    display: flex;
    gap:10px;
    &:hover{
      color:var(--color-facebookblue);
    }
  }
`
const CommentTop = styled.div`
  padding:40px 0;
  display:flex;
  justify-content:space-between;
  font-size:var(--font-size-paragraph);
  .commentTopRight{
    display:flex;
    align-items: center;
    gap:10px;
    .SlArrowDown{
      font-size:16px;
      cursor: pointer;
    }
  }

`
const CommentLists = styled.div`
  display: flex;
  flex-direction:column;
  gap:30px;
  font-size:var( --font-size-paragraph);
  .commentList{
    display: flex;
    align-items: center;
    gap:30px;
    .commentFirstImg{
      width:80px;
      height:80px;
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
      width:80px;
      height:80px;
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
const CommentUpLoad = styled.div`
    display: flex;
    align-items: center;
    justify-content:space-between;
    padding:60px 0%;
    .commentUpLoadprofile{
      display: flex;
      align-items: center;
      gap:30px;
    .profileImg{
      width:80px;
      height:80px;
      background:var(--color-light-gray-01);
      border-radius:100px;
      }
    .profileInputText{
      width:640px;
      height:60px;
      background:var(--color-light-gray-01);
      color:var(--color-gray-01);
      border:none;
      border-radius:50px;
      padding:0 30px;
      font-size:var( --font-size-paragraph);
      &:focus{
        outline:none
      }
    }
    .ciCamera,.gif{
      display: flex;
      justify-content: center;
      align-items: center;
      width:55px;
      height: 55px;
      background:var(--color-light-gray-01);
      border-radius:50px;
      cursor: pointer;
    }
    .ciCamera{
      padding: 10px;
    }
    .gif{
      font-size:var( --font-size-paragraph);
    }
    }
    
`
const Mypage = () => {
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
            우리의 여행 sub folder만 몇 개인지 모르겠다. <br/>
            가만히 둘이서 강을 바라보던 모습이 폰디체리 바다를 하염없이 바라보던 내 틴 시절과 겹쳐져서 한참을 바라봤었다. 
            </div>
            <div className='contentImgs'>
              <div className='contentImg'>.</div>
            </div>
            {/* <div className='Buttons'>
              <div className='btnLeft'><SlArrowLeft/></div>
              <div className='btnRight'><SlArrowRight/></div>
            </div> */}
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
          <CommentUpLoad>
            <div className='commentUpLoadprofile' >
              <div className='profileImg'>.</div>
              <input className='profileInputText' type='text' placeholder='댓글을 입력하세요' >
              </input>
              <div><CiCamera className='ciCamera' /></div>
              <div className='gif'>GIF</div>
            </div>
          </CommentUpLoad>
        </Inner>
      </Wrapper>
  )
}

export default Mypage
