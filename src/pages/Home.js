import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { useSelector, useDispatch } from 'react-redux'
import { setUser, setUserLoggedIn } from '../redux/slices/authSlice'
import { setCurrentPage } from '../redux/slices/navSlice'
import { setAppData } from '../redux/slices/appDataSlice'

const Home = () => {

  const user = useSelector(state=>state.authentication.user)

  return (
    <div className="d-flex w-100 flex-column">
        <h3>Home</h3>
    </div>
  )
}

export default Home