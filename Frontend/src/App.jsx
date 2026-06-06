import { useState } from 'react'

import {BrowserRouter ,Routes,Route} from 'react-router-dom'
import Login from './pages/Auth/login.jsx'
import SignUp from './pages/Auth/signup.jsx'
import Home from './pages/Home.jsx'
import VerifyOtp from './pages/Auth/verifyOtp.jsx'
import Flight from './pages/Flights/Flight.jsx'
import {Toaster} from 'react-hot-toast'
import FlightBooking from'./pages/Flights/Flight_Bookings.jsx'
import FlightPayment from './pages/Flights/Flight_Payment.jsx'
import MyBookings from './pages/Flights/My_Bookings.jsx'
import BookingDetails from './pages/Flights/bookingDetails.jsx'


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
          <Route path='/flights' element={<Flight/>}/>
          <Route path='/Flight/:id/book' element={<FlightBooking/>}/>
          <Route path='/payment' element={<FlightPayment/>}/>
          <Route path='/my-bookings' element={<MyBookings/>}/>

          <Route path='/booking/:id' element={<BookingDetails/>}/>


        </Routes>
       
       
       
       
       
       </BrowserRouter>

    </>
  )
}

export default App
