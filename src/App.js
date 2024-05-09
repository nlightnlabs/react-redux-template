import React, { useState, useEffect } from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setUserLoggedIn } from './redux/slices/authSlice';
import { setCurrentPage, setPages, setPageList } from './redux/slices/navSlice';
import { setAppData } from './redux/slices/appDataSlice';

import Home from "./pages/Home";
import Header from "./components/Header";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ResetPassword from "./pages/ResetPassword";
import { current } from '@reduxjs/toolkit';

function PageComponent({ Page }) {
  return Page ? <Page /> : null;
}

function App() {
  const user = useSelector(state => state.authentication.user);
  const userLoggedIn = useSelector(state => state.authentication.userLoggedIn);
  const currentPage = useSelector(state => state.navigation.currentPage);
  const pages = useSelector(state => state.navigation.pages);
  const appData = useSelector(state => state.navigation.appData);
  const dispatch = useDispatch();

  const getPages = async () => {
    const pageData = [
      { id: 1, name: "Home", label: "Home" },
      { id: 2, name: "SignIn", label: "Sign In" },
      { id: 3, name: "SignUp", label: "Sign Up" },
      { id: 4, name: "ResetPassword", label: "Reset Password" },
    ];
    const response = pageData;
    dispatch(setPages(response));
  };

  useEffect(() => {
    console.log("user", user);
    console.log("userLoggedIn", userLoggedIn);
    console.log("currentPage", currentPage);
    getPages();
  }, []);

  const componentMap = {
    Home,
    SignIn,
    SignUp,
    ResetPassword,
  };

  const PageToRender = componentMap[currentPage];

  return (
    <div className="App">
      <Header />
      {!userLoggedIn && currentPage==="SignUp" ?
        <SignUp/>
      :
      !userLoggedIn ?
        <SignIn/>
      :
        <PageComponent Page={PageToRender} />
      }
      
    </div>
  );
}

export default App;

