import React from 'react'
import { useState } from 'react';
import styled from 'styled-components'

import { addDoc, collection, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../firebase.js';

import "../../styles/loadingSpearTest.css"; // 로딩스피너 테스트
//react-icon
import { BsArrowReturnLeft } from "react-icons/bs"; 
import { FaSpinner } from "react-icons/fa";
import { CiEdit } from "react-icons/ci";

//img
import testCat from '/img/testcat.jpg';

//font
import {MainTitle_18_n,SubDescription_16_n} from '../../styles/GlobalStyles.styles.js';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

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
    .ciEdit,.submitBtn{
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
    .submitBtn{
      padding: 0;
      ${MainTitle_18_n}
      padding:0 20px;
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

  const handleSubmit = async (e) => {
    e.preventDefault(); 
    // const user = auth.currentUser;
    // if (!user || isLoading || post === "" || post.length > 180) return;
    try{
      setIsLoading(true);
      const doc = await addDoc(collection(db, "contents"), {

        // 값 추가 예정
        inputText,
        createdAt: Date.now(),
        // userName: user?.displayName || "Anonymous",
        // userId: user.uid,
      });
    if(file){
      const locationRef = ref(storage, `contents/${user.uid}/${doc.id}`);
      const result = await uploadBytes(locationRef,file);
      const url = await getDownloadURL(result.ref);
      const fileType = file.type;
      if(fileType.startWith("image/")){
        await updateDoc(doc, {
          photo:url,
        });
      }
      if(fileType.startWith("video/")){
        await updateDoc(doc, {
          video:url,
        });
      }
    }
    setPost("");
    setFile(null);
    }
    catch(err){
      console.error(err);
    }
    finally{
      setIsLoading(false);
    }


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
    <WrapperForm onSubmit={handleSubmit}  >
          <CommentCont>
              <div className='commentUpLoadprofile' >
                <img src={testCat} className='profileImg' alt='profileImg'/>
                <input 
                className='profileInputText' 
                onChange={onChange}
                type='text' 
                placeholder={placeholder||'댓글을 입력하세요'}
                value={inputText} 
                required
                />
                <button
                disabled={isLoading} 
                type='submit'
                className='submitBtn'>
                  {/* 테스트용 로딩스피너 */}
                  {isLoading ? ( <FaSpinner className="spinner" />) : (<BsArrowReturnLeft />)}
                </button>
                <div>
                  {/* 아이콘 수정예정 */}
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
