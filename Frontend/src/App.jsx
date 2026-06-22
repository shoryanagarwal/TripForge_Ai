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
import MyBookings from './pages/My_Bookings.jsx'
import BookingDetails from './pages/Flights/bookingDetails.jsx'

import SocketNotification from './socket_noti.jsx'

import Buses from './pages/Bus/Buses.jsx'
import BusBooking from './pages/Bus/BusBooking.jsx'
import BusPayment from './pages/Bus/BusPayment.jsx'
import BusBookingDetails from './pages/Bus/BusBookingDetails.jsx'

import Ai_Assistant from './pages/Ai_Assistant.jsx'
import Notification from './pages/Home/Notification.jsx'
import Profile from './pages/Home/UserProfile.jsx'
import ForgotPassword from './pages/Auth/ForgotPassword.jsx'
import LandingPage from './pages/LandingPage/LandingPage.jsx'

function App() {

  return (
    <>
       <BrowserRouter>
       <Toaster position="top-right" />

       <SocketNotification />
       
        <Routes>

          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/verify-email' element={<VerifyOtp/>}/>
          <Route path='/flights' element={<Flight/>}/>
          <Route path='/Flight/:id/book' element={<FlightBooking/>}/>
          <Route path='/payment' element={<FlightPayment/>}/>
          <Route path='/my-bookings' element={<MyBookings/>}/>
          <Route path='/landing' element={<LandingPage/>}/>
          <Route path='/booking/:id' element={<BookingDetails/>}/>

          <Route path='/forgot-password' element={<ForgotPassword/>}/>



          <Route path='/buses' element={<Buses/>}/>
          <Route path='/buses/:id/book' element={<BusBooking/>}/>
          <Route path='/buspayment' element={<BusPayment/>}/>
          <Route path='/busbooking/:id' element={<BusBookingDetails/>}/>
          <Route path='/assistant' element={<Ai_Assistant/>}/>
          <Route path="/notifications" element={<Notification />} />
          <Route path='/profile' element={<Profile/>}/>


        </Routes>
        
       
       
       
       
       
       
       </BrowserRouter>

    </>
  )
}

export default App
