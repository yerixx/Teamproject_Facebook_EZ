import React, { useEffect, useReducer } from "react";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import Detail from "./pages/Detail";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Signup from "./pages/Signup";
import GlobalStyles from "./styles/GlobalStyles.styles.js";

import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Detail from "./pages/Detail";
import ModalLive from "./components/Modal/ModalLive.jsx";
import GlobalStyles from "./styles/GlobalStyles.styles.js";
import React, { useEffect, useReducer } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";

const Wrapper = styled.div``;

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return { ...state, ...action.data }; //초기화 데이터
    case "ADD_USER": {
      const newState = { ...state, users: [...state.users, action.newUser] };
      return newState;
    }
    case "ADD_POST": {
      // posts 배열에 새 포스트 추가
      const updatedPosts = [action.newPost, ...state.posts];
      return { ...state, posts: updatedPosts };
    }
    case "UPDATE_USER_POSTS": {
      // users 배열에서 해당 userId를 가진 사용자의 posts에 새로운 postId 추가
      const updatedUsers = state.users.map((user) =>
        user.id === action.userId
          ? { ...user, posts: [...user.posts, action.newPostId] } // posts 배열에 새 postId 추가
          : user
      );
      return { ...state, users: updatedUsers };
    }
    case "LIKE_POST": {
      const updatedPosts = state.posts.map((post) => {
        if (post.id === action.postId) {
          const updatedLikes = action.isLiked ? post.likes - 1 : post.likes + 1; // 좋아요 수 증가/감소

          return {
            ...post,
            likes: updatedLikes, // 업데이트된 좋아요 수
          };
        }
        return post;
      });

      return { ...state, posts: updatedPosts };
    }

    case "ADD_COMMENT": {
      // 포스트 ID에 맞는 포스트를 찾아서 댓글 추가
      const updatedPosts = state.posts.map((post) => {
        if (post.id === action.postId) {
          // 해당 포스트의 comments 배열에 새로운 댓글 추가
          return {
            ...post,
            comments: [...post.comments, action.newComment],
          };
        }
        return post;
      });

      return { ...state, posts: updatedPosts };
    }
    // 업데이트는 추후 수정 예정
    case "UPDATE_USER": {
      const updatedUsers = state.users.map((user) =>
        user.id === action.updatedUser.id ? action.updatedUser : user
      );
      return { ...state, users: updatedUsers };
    }

    case "DELETE_POST": {
      const updatedPosts = state.posts.filter(
        (post) => post.id !== action.targetId
      );
      return { ...state, posts: updatedPosts };
    }
    case "SET_CURRENT_USER_DATA":
      return { ...state, currentUserData: action.data };
    default:
      return state;
  }
};

export const DataStateContext = React.createContext();
export const DataDispatchContext = React.createContext();

function App() {
  const initialState = {
    users: [],
    posts: [],
    stories: [],
    groups: [],
    liveCommerce: [],
    likeCategory: [],
    currentUserData: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchData = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const postsSnapshot = await getDocs(collection(db, "posts"));

      const users = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const posts = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // 데이터를 상태에 저장
      dispatch({ type: "INIT", data: { users, posts } });

      // 목업 사용자 설정 (예: 첫 번째 사용자)
      if (users.length > 0) {
        const mockUser = users[0]; // 첫 번째 사용자를 현재 사용자로 설정
        dispatch({ type: "SET_CURRENT_USER_DATA", data: mockUser });
      }
    } catch (error) {
      console.error("데이터를 불러오지 못했습니다.", error);
    }
  };
  useEffect(() => {
    fetchData();
    // 로그인 기능이 구현되지 않았으므로, Firebase Auth 리스너는 일단 생략
    // 나중에 로그인 기능을 구현한 후 아래 코드를 사용하세요.
    // const unsubscribe = auth.onAuthStateChanged(async (user) => {
    //   if (user) {
    //     // 로그인한 사용자 정보 가져오기
    //     try {
    //       const userDocRef = doc(db, "users", user.uid);
    //       const userDoc = await getDoc(userDocRef);
    //       if (userDoc.exists()) {
    //         dispatch({ type: "SET_CURRENT_USER_DATA", data: userDoc.data() });
    //       } else {
    //         console.log("사용자 데이터가 없습니다.");
    //         dispatch({ type: "SET_CURRENT_USER_DATA", data: null });
    //       }
    //     } catch (error) {
    //       console.error("사용자 데이터 가져오기 오류:", error);
    //     }
    //   } else {
    //     // 로그아웃 상태
    //     dispatch({ type: "SET_CURRENT_USER_DATA", data: null });
    //   }
    // });
    // return () => unsubscribe();
  }, []);
  const onCreatePost = async (userId, userName, content, image = null) => {
    const newPost = {
      userId,
      userName,
      content,
      image: image ? [image] : [],
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
    };
    try {
      const docRef = await addDoc(collection(db, "posts"), newPost);

      // Firestore에 추가된 데이터로 상태를 업데이트
      dispatch({
        type: "ADD_POST",
        newPost: { ...newPost, id: docRef.id },
      });

      dispatch({
        type: "UPDATE_USER_POSTS",
        userId,
        newPostId: docRef.id,
      });
    } catch (error) {
      console.error("Firestore에 포스트 추가 중 오류 발생:", error);
    }
  };

  const onAddUser = async (
    userId,
    firstName,
    lastName,
    emailOrPhone,
    password,
    gender = null,
    birthdate = null,
    city = null,
    likeCategory = null
  ) => {
    try {
      const docRef = await addDoc(collection(db, "users"), {
        userId,
        userName: {
          firstName,
          lastName,
        },
        emailOrPhone,
        password,
        gender,
        birthdate,
        city,
        likeCategory,
      });
      dispatch({
        type: "ADD_USER",
        newUser: {
          id: docRef.id,
          userId,
          userName: {
            firstName,
            lastName,
          },
          emailOrPhone,
          password,
          gender,
          birthdate,
          city,
          likeCategory,
        },
      });
    } catch (error) {
      console.error("Firestore에 유저 추가 중 오류 발생:", error);
    }
  };

  const onToggleLike = (postId, isLiked) => {
    dispatch({
      type: "LIKE_POST",
      postId: postId, // 좋아요가 눌린 포스트 ID
      isLiked: isLiked, // 현재 사용자가 이 포스트에 좋아요를 눌렀는지 여부
    });
  };

  const onCreateComment = async (postId, userId, userName, content) => {
    const newComment = {
      id: Date.now().toString(), // 고유한 댓글 ID
      userId: userId, // 댓글 작성자 ID
      userName: userName, // 댓글 작성자 이름
      content: content, // 댓글 내용
      createdAt: new Date().toISOString(), // 댓글 작성 시간
      likes: 0, // 좋아요 기본값
    };

    try {
      // Firestore에서 해당 포스트 문서 참조
      const postDocRef = doc(db, "posts", postId);

      // Firestore의 해당 포스트에 댓글 추가 (comments 필드에 array로 저장)
      await updateDoc(postDocRef, {
        comments: arrayUnion(newComment),
      });

      // 상태 업데이트 (옵션)
      dispatch({
        type: "ADD_COMMENT",
        postId: postId, // 댓글이 달릴 포스트 ID
        newComment: newComment,
      });
    } catch (error) {
      console.error("댓글 추가 중 오류 발생:", error);
    }

  };
  const onDeletePost = (postId) => {
    dispatch({
      type: "DELETE_POST",
      targetId: postId, // 삭제할 포스트의 ID
    });
  };

  return (
    <>
      <GlobalStyles />
      <DataStateContext.Provider value={state}>
        <DataDispatchContext.Provider
          value={{
            onCreatePost,
            onAddUser,
            onCreateComment,
            onToggleLike,
            onDeletePost,
          }}
        >
          <Wrapper>
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/detail" element={<Detail />} />
              <Route path="/ModalLive" element={<ModalLive />} />
            </Routes>
          </Wrapper>
        </DataDispatchContext.Provider>
      </DataStateContext.Provider>
    </>
  );
}

export default App;
