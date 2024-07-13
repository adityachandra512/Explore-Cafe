import React from 'react'
import Home from './home/Home'
import { Navigate, Route,Routes } from 'react-router-dom'
import Menu from '../src/menu/menu'
import Signup from './components/signup'
import { Toaster } from 'react-hot-toast';
import Contact from '../src/Contactform/contactform'
import { userAuth } from './context/AuthProvider'
function App() {
  const[authUser,setAuthUser]=userAuth()
  console.log(authUser)

  return (
    <>
    <div className="dark:bg-slate-900 dark:text-white">
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/Menu' element={authUser?<Menu/>:<Navigate to="/signup"/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/contact' element={<Contact/>}/>
    </Routes>
    <Toaster/>
    </div>
    </>
  )
}

export default App
