import React from 'react'
import { useState } from 'react';

import styled from 'styled-components'
// import { motion, AnimatePresence } from "framer-motion";

//img
import testCat from '/img/testcat.jpg';

//font
import {MainTitle_26_b,SubDescription_16_n,SubDescription_12_m, SubDescription_14_n, Paragraph_20_n} from '../../styles/GlobalStyles.styles.js';

const Wrapper = styled.section`
  z-index:1;
  position: absolute;
  top:-100px;
  width:100%;
  /* height:320px; */
  height:261px;
  display:flex;
  flex-direction:column;
  justify-content: center;
  gap:60px;
  align-items: center;
  position:relative;
  padding:0 90px;
  background:var(--color-white);
  border-radius:30px 30px 0 0;
  /* 미디어 쿼리 */
  @media (max-width : 768px) {
  top:-30px;
  max-width: 100%;
  height:200px;
  padding:0;
  /* border:1px solid #f00; */
  } 
  `
const Profile = styled.div`
  width:100%;
  display: flex;
  .profileContent{
    width:100%;
    display: flex;
    gap:30px;
  @media (max-width : 768px) {
    width:100%;
    padding:0 20px ;
    align-items: center;
    gap:15px;
    } 
  .profileImg{
    width:100px;
    height:100px;
    background:var(--color-gray-01);
    border-radius:100%;
    object-fit:cover;
      /* 미디어 쿼리 */
      @media (max-width : 768px) {
      width:110px;
      height:110px;
  }
}
  .profileText{
    width:100%;
    display: flex;
    flex-direction:column;
    gap:5px;
    padding-top:6px;
    .profileTop{
      max-width:100%;
      display: flex;
      justify-content:space-between;
      /* 미디어 쿼리 */
      @media (max-width : 768px) {
      align-items: center;
      
      }
      .profileName{
        ${MainTitle_26_b}
        color:var(--color-gray-01);
      /* 미디어 쿼리 */
      @media (max-width : 768px) {
        ${Paragraph_20_n}
        font-weight:700;
        width:fit-content;
        flex-wrap:wrap;
        }
      }
    }
  }
}
  /* 미디어 쿼리 */
  @media (max-width : 768px) {
  width: 100%;
  }
`
const EditProfileDesc = styled.div`
      position: relative;
      padding:4px 0;
      color:var(--color-gray-01);
      display: flex;
      flex-direction:column;
      gap:10px;
      .editBox{
        position: absolute;
        display: flex;
        flex-direction:column;
        width:100%;
        height:fit-content;
        gap:10px;
        textarea{
          ${SubDescription_16_n};
          resize: none;
          &:focus{
            outline:none;
          }
          @media (max-width : 768px) {
          ${SubDescription_14_n}
      }
        }
        .editBtns{
          display: flex;
          justify-content:end;
          gap:10px;
          *{
            ${SubDescription_16_n};
            width:50px;
            border:none;
            padding:4px 10px;
            border-radius:8px;
            color:var(--color-gray-01);
            cursor: pointer;
            transition: all 0.3s;
            &:hover{
              color:var(--color-facebookblue);
              font-weight:600;
            }
            @media (max-width : 768px) {
              ${SubDescription_12_m};
               height:26px;
            }
          }
        }
      }
  
`
const ProfileDesc = styled.div`
      ${SubDescription_16_n}
      padding:4px 0;
      color:var(--color-gray-01);
      @media (max-width : 768px) {
      ${SubDescription_14_n}
      }
  
`
const Button = styled.div`
  display:flex;
  gap:20px;
*{
  ${SubDescription_16_n}
  width:165px;
  height:42px;
  border:none;
  border-radius:var(--border-radius-08);
  cursor: pointer;
  transition: opacity 0.8s;
  /* &:nth-child(1){
    background:var(--color-facebookblue);
    color:var(--color-white);
  } */
    &:nth-child(1),&:nth-child(2){
    background:var(--color-light-gray-01);
    color:var(--color-gray-01);
    
  }
  &:hover{
    background:var(--color-facebookblue);
    color:var(--color-white);
    font-weight:600;
  }
  /* 미디어 쿼리 */
  @media (max-width : 768px) {
    ${SubDescription_12_m}
    max-width:76px;
    height:34px;
  } 
}
  /* 미디어 쿼리 */
  @media (max-width : 768px) {
  gap:6px;
  } 
`


const ProfileCard = () => {
  const [isEditing,setEditing] = useState(false);
  const [desc,setDesc] = useState("A Photographer @pylpic")

  const profileEdite = () => {
    setEditing(true)
  }
  const editCencel = () => {
    const confirmCencel = window.confirm("프로필 수정 작업을 취소 하시겠습니까?")
    if(confirmCencel) {
      setEditing(false);
      setDesc("A Photographer @pylpic");
    }

  }
  const editSave = (e) => {
    const confirmSave = window.confirm("프로필을 설정을 저장하시겠습니까?")
    if (confirmSave){
      setEditing(false)
    }
  }


  return (
    <Wrapper>
          <Profile>
              <div className='profileContent' >
                <img src={testCat} className='profileImg'/>
                <div className='profileText'>
                  <div className='profileTop'>
                    <h1 className='profileName'>박예림</h1>
                    <Button>
                      <button>스토리추가</button>
                      <button onClick={profileEdite}>프로필수정</button>
                    </Button>
                  </div>
                  {isEditing ? (
                <EditProfileDesc> 
                <div className='editBox'>
                <textarea 
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  />
                  <div className='editBtns'>
                    <button onClick={editCencel} type='submit'>취소</button>
                    <button onClick={editSave} type='submit'>확인</button>
                  </div>
                 </div>
                  </EditProfileDesc>
                    ):  
                    (<ProfileDesc>
                    {desc}
                   </ProfileDesc>)
                    }
                </div>
              </div>
          </Profile>
  
    </Wrapper>
  )
}

export default ProfileCard