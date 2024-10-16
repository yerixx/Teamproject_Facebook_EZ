import { Routes, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/common/Layout.jsx";
import LoadingScreen from "./components/common/LoadingScreen.jsx";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Detail from "./pages/Mypage.jsx";
import ModalLive from "./components/Modal/ModalLive.jsx";
import Comment from "./components/common/Comment.jsx";
import ModalCont from "./components/Modal/ModalCont.jsx";
import GlobalStyles from "./styles/GlobalStyles.styles.js";
import React, { useEffect, useReducer, useState } from "react";
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
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "./firebase.js";
import { darkTheme } from "./styles/theme.js";
import { lightTheme } from "./styles/theme.js";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import { setLastAddedTime, canAddPoints } from "./utils/util.js";

// Page Router
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: <Main />,
      },
      {
        path: "mypage",
        element: <Detail />,
      },
      {
        path: "modallive/:id",
        element: <ModalLive />,
      },
      {
        path: "comment",
        element: <Comment />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

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
    //라이브 커머스 포인트
    case "INIT_POINTS": {
      const storedPoints = localStorage.getItem("points");
      const initialPoints = storedPoints ? parseInt(storedPoints) : 0;
      return { ...state, points: initialPoints };
    }
    case "ADD_POINTS":
      return {
        ...state,
        currentUserData: {
          ...state.currentUserData,
          wallet: {
            ...state.currentUserData.wallet,
            point: (state.currentUserData.wallet?.point || 0) + action.payload,
          },
        },
      };
    case "SET_CURRENT_USER_DATA":
      return { ...state, currentUserData: action.data };
    default:
      return state;
  }
};

export const DataStateContext = React.createContext();
export const DataDispatchContext = React.createContext();
export const DarkThemeContext = React.createContext();

function App() {
  const [isDark, setIsDark] = useState(false);
  const [authLoading, setAuthLoading] = useState(true); // 인증 로딩 상태
  const [dataLoading, setDataLoading] = useState(true); // 데이터 로딩 상태
  useEffect(() => {
    const savedTheme = localStorage.getItem("isDark");
    if (savedTheme) {
      setIsDark(JSON.parse(savedTheme));
    }
  }, []);

  // 다크 모드 상태가 변경될 때마다 로컬 스토리지에 저장
  useEffect(() => {
    localStorage.setItem("isDark", JSON.stringify(isDark));
  }, [isDark]);

  // Loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await auth.authStateReady(); // 인증 상태가 준비된 후 호출
      await fetchData(); // 데이터를 불러오는 함수 호출
      setIsLoading(false); // 데이터가 모두 준비된 후 로딩 상태 해제
    };
    init();
  }, []);

  const initialState = {
    users: [],
    posts: [],
    stories: [],
    groups: [],
    liveCommerce: [],
    likeCategory: [],
    category: [],
    currentUserData: null,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await fetchUserData(user);
      }
      setAuthLoading(false); // 인증 로딩 해제
    });
    return () => unsubscribe();
  }, []);

  const fetchData = async () => {
    try {
      const usersSnapshot = await getDocs(collection(db, "users"));
      const postsSnapshot = await getDocs(collection(db, "posts"));
      const categorySnapshot = await getDocs(collection(db, "category"));
      const users = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        posts: [],
        ...doc.data(),
      }));

      const posts = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const categories = categorySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const response = await fetch("/mockData/mockData.json");
      const mockData = await response.json();

      dispatch({
        type: "INIT",
        data: { users, posts, mockData, category: categories },
      });
      setDataLoading(false);
    } catch (error) {
      console.error("데이터를 불러오지 못했습니다.", error);
    }
  };

  const fetchUserData = async (user) => {
    try {
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const data = userDoc.data();
        dispatch({
          type: "SET_CURRENT_USER_DATA",
          data: {
            ...data,
            profileImage: data.profileImage || "", // 기본값 설정
          },
        });
      } else {
        dispatch({ type: "SET_CURRENT_USER_DATA", data: null });
      }
    } catch (error) {
      console.error("사용자 데이터 가져오기 오류:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        await fetchUserData(user); // 사용자 데이터 가져오기
        setIsLoading(false); // 로딩 완료 후 false 설정
      } else {
        dispatch({ type: "SET_CURRENT_USER_DATA", data: null });
        setIsLoading(false); // 로딩 완료 후 false 설정
      }
    });

    return () => unsubscribe(); // 클린업 함수로 리스너 해제
  }, []);

  const onCreatePost = async (userId, userName, content, image = null) => {
    const { currentUserData } = state;
    const newPost = {
      userId,
      userName,
      profileImage: currentUserData.profileImage || "",
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
      comments: [],
    };
    // 이미지가 존재할 때만 newPost에 image 필드를 추가
    if (image) {
      newPost.image = [image];
    }
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

  const onUpdatePost = async (postId, updatedData) => {
    try {
      const postRef = doc(db, "posts", postId);
      await updateDoc(postRef, updatedData);
    } catch (error) {
      console.error("게시물 수정 중 오류:", error);
    }
  };

  const onAddUser = async (
    userId,
    firstName,
    lastName,
    email,
    point = 0,
    won = 0,
    gender = null,
    birthdate = null,
    city = null,
    likeCategory = [],
    profileImage = "",
    backgroundImage = "",
    introduction = ""
  ) => {
    try {
      const userDoc = {
        userId,
        userName: {
          firstName,
          lastName,
        },
        email,
        gender,
        birthdate,
        city,
        likeCategory,
        profileImage,
        backgroundImage,
        introduction,
        wallet: {
          point,
          won,
        },
      };
      await setDoc(doc(db, "users", userId), userDoc);

      dispatch({
        type: "ADD_USER",
        newUser: {
          ...userDoc,
          posts: [],
        },
      });
      // 포인트 적립 로직 추가
      // 7초마다 포인트 지급 시도 (개별 사용자로 포인트를 관리)
      const pageName = window.location.pathname; // 현재 페이지 경로 가져오기
      const interval = setInterval(() => {
        if (canAddPoints(pageName)) {
          dispatch({ type: "ADD_POINTS", value: 500, userId }); // userId별로 포인트 추가
        }
      }, 7000);

      // 컴포넌트가 언마운트될 때 인터벌 해제
      return () => clearInterval(interval);
    } catch (error) {
      console.error("Firestore에 유저 추가 중 오류 발생:", error);
    }
  };
  const onToggleLike = async (postId, isLiked) => {
    dispatch({
      type: "LIKE_POST",
      postId: postId, // 좋아요가 눌린 포스트 ID
      isLiked: isLiked, // 현재 사용자가 이 포스트에 좋아요를 눌렀는지 여부
    });
  };

  const onCreateComment = async (postId, userId, userName, content) => {
    if (!userId || !content) {
      console.error("userId나 content가 누락되었습니다.");
      return;
    }

    const newComment = {
      id: Date.now().toString(), // 고유한 ID
      userId: userId || "guest", // 기본값 설정
      userName: userName || "Anonymous", // 기본값 설정
      content,
      createdAt: new Date().toISOString(),
      likes: 0,
    };

    try {
      const postDocRef = doc(db, "posts", postId);
      const postDoc = await getDoc(postDocRef);

      if (!postDoc.exists()) {
        console.error("해당 포스트가 존재하지 않습니다:", postId);
        return;
      }

      await updateDoc(postDocRef, {
        comments: arrayUnion(newComment),
      });

      dispatch({
        type: "ADD_COMMENT",
        postId,
        newComment,
      });
    } catch (error) {
      console.error("댓글 추가 중 오류 발생:", error);
    }
  };

  const onDeleteComment = async (postId, commentId) => {
    try {
      // Firestore에서 해당 포스트 참조
      const postDocRef = doc(db, "posts", postId);
      const postDoc = await getDoc(postDocRef);

      if (postDoc.exists()) {
        const postData = postDoc.data();

        // 해당 댓글을 제외한 새로운 댓글 배열 생성
        const updatedComments = postData.comments.filter(
          (comment) => comment.id !== commentId
        );

        // Firestore에 업데이트된 댓글 배열 저장
        await updateDoc(postDocRef, { comments: updatedComments });

        // 상태 업데이트
        dispatch({
          type: "DELETE_COMMENT",
          postId,
          commentId,
        });
      }
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
    }
  };

  const onDeletePost = async (postId) => {
    try {
      await deleteDoc(doc(db, "posts", postId));
      dispatch({ type: "DELETE_POST", targetId: postId });
    } catch (error) {
      console.error("Firestore에서 포스트 삭제 중 오류 발생:", error);
    }
  };

  if (authLoading || dataLoading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <DarkThemeContext.Provider value={{ isDark, setIsDark }}>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <GlobalStyles />
          <DataStateContext.Provider value={state}>
            <DataDispatchContext.Provider
              value={{
                onCreatePost,
                onUpdatePost,
                onAddUser,
                onCreateComment,
                onToggleLike,
                onDeletePost,
                ...state,
                dispatch,
              }}
            >
              {isLoading ? (
                <LoadingScreen />
              ) : (
                <RouterProvider router={router} />
              )}
            </DataDispatchContext.Provider>
          </DataStateContext.Provider>
        </ThemeProvider>
      </DarkThemeContext.Provider>
    </>
  );
}

export default App;
