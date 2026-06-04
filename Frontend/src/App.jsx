import { useState } from 'react'

import {BrowserRouter ,Routes,Route} from 'react-router-dom'
import Login from './pages/login.jsx'
import SignUp from './pages/signup.jsx'
import Home from './pages/Home.jsx'
import VerifyOtp from './pages/verifyOtp.jsx'

import {Toaster} from 'react-hot-toast'



function App() {

  return (
    <>
       <BrowserRouter>
       <Toaster position="top-right" />
       
        <Routes>

          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/verify-email' element={<VerifyOtp/>}/>



        </Routes>
       
       
       
       
       
       </BrowserRouter>

    </>
  )
}

export default App
