import React from 'react'
import Home from './home/Home'
import { Navigate, Route,Routes } from 'react-router-dom'
import Menu from '../src/menu/menu'
import Signup from './components/signup'
import About from '../src/aboutus/aboutus'
import { Toaster } from 'react-hot-toast';
import Contact from '../src/Contactform/contactform'
import { userAuth } from './context/AuthProvider'
import Order from './components/order'
import Admin from './admin/admin'
import AdminLayout from './admin/AdminLayout';
import OrderAdmin from './admin/orderAdmin';
import MenuAddition from './admin/menuaddition';
import Users from './admin/users';
import Profile from './components/Profile';

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
      <Route path='/about' element={<About/>}/>
      <Route path="/order" element={<Order />} />
      <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/signup" />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="orders" element={<OrderAdmin />} />
        <Route index element={<Admin />} />
        <Route path="menu" element={<MenuAddition />} />
        <Route path="/admin/users" element={<Users />} />
      </Route>
    </Routes>
    <Toaster/>
    </div>
    </>
  )
}

export default App
