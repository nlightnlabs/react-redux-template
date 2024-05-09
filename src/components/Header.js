import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setUserLoggedIn } from '../redux/slices/authSlice'
import { setCurrentPage } from '../redux/slices/navSlice'
import { setAppData } from '../redux/slices/appDataSlice'
import { clearAllStorage } from '../redux/store'; // Import from centralized utility file


const Header = () => {

  const user = useSelector((state)=>state.authentication.user)
  const userLoggedIn = useSelector((state)=>state.authentication.userLoggedIn)

  const dispatch = useDispatch()

  const handleSignOut = (e)=>{
    dispatch(setUser(null))
    dispatch(setUserLoggedIn(false))
    dispatch(setCurrentPage("home"))
    dispatch(clearAllStorage())
  }

  const HeaderStyle ={
    height: "75px",
    borderBottom: "1px solid lightgray"
  }

  return (
    <div className="d-flex bg-light w-100 mb-3 align-items-center" style={HeaderStyle}>
      
      <div 
        className="d-flex w-50 ms-3" 
        style={{fontSize:"24px", textShadow: "2px 2px 2px rgba(0,0,0,0.25)",color: "rgb(0,100,225)",fontWeight: "bold"}}
      >
        Redux App
      </div>
      
      <div className="d-flex w-50 justify-content-end">
      {userLoggedIn && 
          <div>
            <label>{user.first_name}</label>
            <button className="btn btn-light" onClick={(e)=>handleSignOut(e)}>Sign Out</button>
          </div>
      }
       </div>
    </div>
  )
}

export default Header