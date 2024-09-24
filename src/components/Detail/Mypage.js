import React from 'react'
import styled from 'styled-components'
import { IoCloseOutline } from "react-icons/io5";
import { BsThreeDots } from "react-icons/bs";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { FaRegHeart } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { FiShare } from "react-icons/fi";
import { FaRegBookmark } from "react-icons/fa6";

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
    width:285px;
    height:200px;
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
    cursor: pointer;
    display: flex;
    gap:10px;
    &:hover{
      color:var(--color-facebookblue);
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
              <div className='contentImg'>.</div>
              <div className='contentImg'>.</div>
            </div>
            <div className='Buttons'>
              <div className='btnLeft'><SlArrowLeft/></div>
              <div className='btnRight'><SlArrowRight/></div>
            </div>
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
        </Inner>
      </Wrapper>
  )
}

export default Mypage
