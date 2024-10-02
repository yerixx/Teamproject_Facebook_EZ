import React from 'react'
import "../../styles/loadingSpearTest.css"; // 스타일을 위한 CSS 파일

import styled from 'styled-components'
//react-icon
import { BsArrowReturnLeft } from "react-icons/bs"; 
import { FaSpinner } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

//img
import testCat from '/img/testcat.jpg';

//font
import {MainTitle_18_n,SubDescription_16_n} from '../../styles/GlobalStyles.styles.js';
import { useState } from 'react';

const WrapperForm = styled.form`
width:100%;
height:fit-content;
display:flex;
justify-content: center;
align-items: center;
`
const CommentCont = styled.div`
    width:870px;
    display: flex;
    align-items: center;
    /* margin:60px 0; */
    margin-bottom:60px;
    padding:40px 0;
    border-top:1px solid var(--color-light-gray-01);
    border-bottom:1px solid var(--color-light-gray-01);
      /* 미디어 쿼리 */
      @media (max-width : 768px) {
        ${SubDescription_16_n}
        margin: 0 10px;
        height:110px;
        
     }
    .commentUpLoadprofile{
      width:100%;
      display: flex;
      align-items: center;
      justify-content:space-between;
      
    .profileImg{
      width:60px;
      height:60px;
      background:var(--color-light-gray-01);
      border-radius:100px;
       /* 미디어 쿼리 */
        @media (max-width : 768px) {
        width:40px;
        height:40px;
        object-fit:cover;
     }
    }
    .profileInputText{
      ${MainTitle_18_n}
      /* width:640px; */
      width:100%;
      height:60px;
      margin:0 30px;
      padding:0 30px;
      background:var(--color-light-gray-01);
      color:var(--color-gray-01);
      border:none;
      border-radius:50px;
      &:focus{
        outline:none
      }
     /* 미디어 쿼리 */
      @media (max-width : 768px) {
        ${SubDescription_16_n}
        margin: 0 10px;
        padding: 0 20px;
        height:44px;
     }
    }
    .ciEdit,.uploadBtn{
      color:var(--color-black);
      display: flex;
      justify-content: center;
      align-items: center;
      width:55px;
      height: 55px;
      background:var(--color-light-gray-01);
      border:none;
      border-radius:50px;
      cursor: pointer;
       /* 미디어 쿼리 */
        @media (max-width : 768px) {
        width:44px;
        height:44px;
        padding:12px;
     }
    }
    .uploadBtn{
      ${MainTitle_18_n}
      margin-right:30px;
      /* 미디어 쿼리 */
      @media (max-width : 768px) {
      margin-right:10px;
     }
    }
    .ciEdit{
      padding: 13px;
      }
    }
    /* 미디어 쿼리 */
    @media (max-width : 768px) {
    width:100%;
    margin:60px 0;
  }
`

const PostUploadField = ({placeholder}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [inputText,setInputText] = useState("")
  // const [file,setFile] = useState<File | null>(null)

  const onChange = (e) => {
    setInputText(e.target.value);
  }

  const onSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 시 페이지 리로드 방지
    setIsLoading(true);
    // 실제 비동기 작업을 수행하는 부분 (예: API 호출)
    setTimeout(() => {
      setIsLoading(false);
      setInputText(""); // 입력 필드 초기화
    }, 1000);
  }

  const modal = () => {
    // 파일 업로드 모달을 여는 로직 추가예정
    document.getElementById('fileInput').click();
  }

// // 이미지 업로드 모달 또는 파일 선택 핸들러
//   const handleImageUpload = (e) => {
//       const file = e.target.files[0];
//       if (file) {
//         const reader = new FileReader();
//         reader.onloadend = () => {
//           setImageSrc(reader.result); // 이미지 URL 설정
//         };
//         reader.readAsDataURL(file);
//       }
//   }

  return (
    <WrapperForm >
          <CommentCont>
              <div className='commentUpLoadprofile' >
                <img src={testCat} className='profileImg' alt='profileImg'/>
                <input 
                className='profileInputText' 
                type='text' 
                placeholder={placeholder||'댓글을 입력하세요'}
                value={inputText} 
                onChange={onChange}
                />
                <button
                disabled={isLoading} 
                type='submit'
                onClick={onSubmit} 
                className='uploadBtn'>
                  {isLoading ? ( <FaSpinner className="spinner" />) : (<BsArrowReturnLeft />)}
                </button>
                <div>
                  <CiEdit 
                  className='ciEdit' 
                  htmlFor='file'
                  onClick={modal}
                  />
              {/* 파일 입력 요소 (숨김) */}
                {/* <input
                type='file'
                id='fileInput'
                accept='image/*'
                style={{ display: 'none' }}
                onChange={handleImageUpload}
                /> */}
                </div>
              </div>
          </CommentCont>
    </WrapperForm>

  )
}

export default PostUploadField;
