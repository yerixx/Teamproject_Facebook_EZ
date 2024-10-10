import React from 'react'
import styled from 'styled-components'

//font
import {MainTitle_26_b,MainTitle_18_n,SubDescription_16_n,SubDescription_12_m} from '../../styles/GlobalStyles.styles.js';
import { useState } from 'react';

const Wrapper = styled.section`
  z-index:1;
  position: absolute;
  top:-100px;
  width:100%;
  height:320px;
  display:flex;
  flex-direction:column;
  justify-content: end;
  gap:60px;
  align-items: center;
  position:relative;
  padding:0 90px;
  background:var(--color-white);
  border-radius:30px 30px 0 0;
  /* 미디어 쿼리 */
  @media (max-width : 768px) {
  max-width: 100%;
  padding:0;
  } 
  `
const Profile = styled.div`
  width:100%;
  display: flex;
  /* justify-content: space-between; */
  .profileContent{
    width:100%;
    display: flex;
    /* justify-content: space-between; */
    gap:30px;
  @media (max-width : 768px) {
    width:100%;
    padding:0 60px ;
    align-items: center;
    } 
  .profileImg{
    width:100px;
    height:90px;
    background:var(--color-gray-01);
    border-radius:100%;
    /* 미디어 쿼리 */
    @media (max-width : 768px) {
      width:190px;
      height:130px;
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
      .profileName{
        ${MainTitle_26_b}
        color:var(--color-gray-01);
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
          }
        }
      }
`
const ProfileDesc = styled.div`
      ${SubDescription_16_n}
      padding:4px 0;
      color:var(--color-gray-01);
  
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
  transition: opacity 0.3s;
  /* &:nth-child(1){
    background:var(--color-facebookblue);
    color:var(--color-white);
  } */
    &:nth-child(1),&:nth-child(2){
    background:var(--color-light-gray-01);
    color:var(--color-gray-01);
  }
  &:hover{
    color:var(--color-facebookblue);
    font-weight:600;
  }
  /* 미디어 쿼리 */
  @media (max-width : 768px) {
    ${SubDescription_12_m}
    max-width:90px;
  } 
}

`
const ContChangeBtn = styled.div`
  display: flex;
  justify-content: center;
  width:100%;
  padding:20px 0 ;
  /* border-bottom:1px solid var(--color-light-gray-01); */
  *{
    ${MainTitle_18_n};
    flex:1;
    border:none;
    background:var(--color-white);
    cursor: pointer;
    &:nth-child(1){
      color:var(--color-facebookblue);
      font-weight:600;
      position: relative;
      &::after{
        content:"";
        position: absolute;
        width:100%;
        bottom:-22px;
        right:0;
        border-bottom:4px solid var(--color-facebookblue);
    }
  }
}
  
`

const ProfileCard = () => {
  const [isEditing,setEditing] = useState(false)
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
                <div className='profileImg'></div>
                <div className='profileText'>
                  <div className='profileTop'>
                    <h1 className='profileName'>박예림</h1>
                    <Button>
                      <button>스토리에 추가</button>
                      <button onClick={profileEdite}>프로필 수정</button>
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
          <ContChangeBtn>
            <button>게시글</button>
            <button>사진 및 동영상</button>
          </ContChangeBtn>
    </Wrapper>
  )
}

export default ProfileCard