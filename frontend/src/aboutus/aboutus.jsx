import React from 'react'
import Navbar from '../components/navbar'
import AboutUs from "../components/aboutus.jsx"
function aboutus() {
  return (
   <>
   <Navbar/>
   <div className='min-h-screen pt-20'>
    <AboutUs/>
   </div>
   </> 
  )
}

export default aboutus
