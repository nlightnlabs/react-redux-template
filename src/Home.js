import React, {useState, useEffect} from 'react'
import "bootstrap/dist/css/bootstrap.min.css"
import { useSelector, useDispatch } from 'react-redux'
import { setCurrentPage, setPageList } from './redux/slices/navSlice'

const Home = () => {

  
  const dispatch = useDispatch()
  const pageList = useSelector(state=>state.navigation.pageList)

  useEffect(()=>{
    dispatch(setCurrentPage("Home"))
    dispatch(setPageList([...pageList,"Home"]))
  },[])

  const pageStyle ={
    height:"100%", 
    width:"100%",
  }

  return (
    <div className="w-100 p-3 fade-in" style={pageStyle}>
        <div className="page-title">Home</div>
    </div>
  )
}

export default Home