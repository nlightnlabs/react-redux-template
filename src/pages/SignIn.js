import React, {useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setUserLoggedIn } from '../redux/slices/authSlice'
import { setCurrentPage } from '../redux/slices/navSlice'
import { setAppData } from '../redux/slices/appDataSlice'

import "../App.css"

const SignIn = () => {

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(setCurrentPage("SignIn"))
    })

    const [formData, setFormData] = useState({
        email: "",
        pwd: ""
    })

  const handleChange=(e)=>{
    const {name, value} = e.target
    setFormData({...formData,...{[name]:value}})
  }

  const handleSubmit = (e)=>{

    e.preventDefault()

    const email = formData.email
    const pwd = formData.pwd
    
    //Validate user:
    let authenticatedUserData = formData

    dispatch(setUser(authenticatedUserData))
    dispatch(setUserLoggedIn(true))
    dispatch(setCurrentPage("Home"))
  }

  const handleForgotPassword = ()=>{
    dispatch(setCurrentPage("ForgotPassword"))
  }

  const currentPage = useSelector(state=>state.navigation.currentPage)

  return (
    <div className="d-flex flex-column w-100">
        <h1 style={{width: "100%"}}>Sign in</h1>

        <div className="d-flex justify-content-center w-100">
            <div 
                className="d-flex bg-light-subtle w-100 flex-column p-3 mt-1 shadow rounded-3" 
                style={{maxWidth:"400px", minWidth: "300px"}}
            >
                <div className="form-floating mb-3">
                    <input 
                        type="email" 
                        name="email" 
                        className="form-control" 
                        placeholder="Email"
                        value = {formData.email}
                        onChange = {(e)=>handleChange(e)}
                    >    
                    </input>
                    <label htmlFor="email" className="form-label">Email: </label>
                </div>
                <div className="form-floating">
                    <input 
                        type="password" 
                        name="pwd" 
                        className="form-control" 
                        placeholder="Password"
                        value = {formData.pwd}
                        onChange = {(e)=>handleChange(e)}
                    ></input>
                    <label htmlFor="pwd" className="form-label">Password: </label>
                </div>

                <div className="d-flex flex-column w-100 mt-3">
                    <div className="d-flex justify-content-center w-100">
                        <button className="btn btn-primary" onClick={(e)=>handleSubmit(e)}>Submit</button>
                    </div>
                    <label 
                        className="d-flex justify-content-center mt-3 hovered"
                        style={{color: "gray", cursor: "pointer"}}
                        onClick={(e)=>handleForgotPassword(e)}
                        >
                        Forgot Password
                    </label>

                    <label 
                        className="d-flex justify-content-center mt-3 hovered"
                        style={{color: "gray", cursor: "pointer"}}
                        onClick={(e)=>dispatch(setCurrentPage("SignUp"))}
                        >
                        New User Sign Up
                    </label>

                </div>

            </div>
        </div>
    </div>
  )
}

export default SignIn