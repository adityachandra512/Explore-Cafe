import React from 'react'
import Navbar from '../components/navbar'
import Menu from '../components/menu'
import Footer from '../components/footer'
function menu() {
  return (
    <>
    <Navbar/>
    <div className='min-h-screen pt-28'>
    <Menu/>
    </div>
    <Footer/>
    </>
  )
}

export default menu
