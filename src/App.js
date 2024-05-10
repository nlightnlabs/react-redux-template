import React, { useState, useEffect, useRef } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from 'react-redux';
import { setUser, setUserLoggedIn } from './redux/slices/authSlice';
import { setCurrentPage, setPageList } from './redux/slices/navSlice';
import { setAppData } from './redux/slices/appDataSlice';

import Home from "./Home";
import Header from "./components/Header";
import Menu from "./components/Menu.js"
import SignIn from "./modules/authentication/pages/SignIn";
import SignUp from "./modules/authentication/pages/SignUp";
import ResetPassword from "./modules/authentication/pages/ResetPassword";
import Profile from "./modules/account/pages/Profile";
import Settings from "./modules/account/pages/Settings";

import { current } from '@reduxjs/toolkit';

function PageComponent({ Page }) {
  return Page ? <Page /> : null;
}

function App() {

  // Set application details:
  const appName = "template"
  const logoFile = "nlightn_labs_logo.png"
  const dbName = "main"
  const fileStorageBucketName = "nlightnlabs01"
  const theme = "nlightn labs main"

  // Global States
  const user = useSelector(state => state.authentication.user);
  const userLoggedIn = useSelector(state => state.authentication.userLoggedIn);
  const currentPage = useSelector(state => state.navigation.currentPage);
  const appData = useSelector(state => state.navigation.appData);
  
  const dispatch = useDispatch();
 

  // local states
  const [pages, setPages] = useState([])
  const [menuItems, setMenuItems] = useState([])
  const containerRef = useRef()

  // Setup data
  const pageData = [
 
    { id: 1, name: "SignIn", label: "Sign In", component: <SignIn/> },
    { id: 2, name: "SignUp", label: "Sign Up",component: <SignUp /> },
    { id: 3, name: "ResetPassword", label: "Reset Password",component: <ResetPassword/> },
    { id: 4, name: "Home", label: "Home", component: <Home/> },
    { id: 5, name: "Profile", label: "Profile", component: <Profile/> },
    { id: 6, name: "Settings", label: "Settings", component: <Settings/> },
  ];

  const menuItemsData = [
    {id: 1, section: 1, name: "home", label: "Home", icon: "HomeIcon", link: "Home"},
    {id: 2, section: 1, name: "profile", label: "Profile", icon: "ProfileIcon", link: "Profile"},
    {id: 3, section: 1, name: "settings", label: "Settings", icon: "SettingsIcon", link: "Settings"},
    {id: 4, section: 2, name: "module1", label: "Module 1", icon: "AppIcon", link: "Home"},
    {id: 5, section: 2, name: "module2", label: "Module 2", icon: "AppIcon", link: "Home"},
    {id: 6, section: 2, name: "module3", label: "Module 3", icon: "AppIcon", link: "Home"}
  ]

  const getPages = async () => {
    setPages(pageData)
  };

  
  const getMenuItems = async ()=>{
    setMenuItems(menuItemsData)
  }


  useEffect(() => {
    console.log(currentPage)
    getPages();
    getMenuItems()
  }, []);



  return (
    <div className="flex-container overflow-hidden" style={{height: "100vh", width: "100vw"}}>
        
        <Header appName={appName} logo={logoFile}/>

        <div className="d-flex w-100" style={{height:"100%"}}>
          {!userLoggedIn && currentPage==="SignUp" ?
            <SignUp/>
          :
          !userLoggedIn ?
            <SignIn/>
          :
            <div className="d-flex w-100 justify-content-between" style={{height:"100%"}}>
                {pages.length>0  && pages.find(i=>i.name ===currentPage).component}
                {menuItems.length>0 && <Menu menuItems={menuItems} colorTheme="nlightn blue"/> }
            </div>
          }
        </div>

    </div>
  );
}

export default App;

