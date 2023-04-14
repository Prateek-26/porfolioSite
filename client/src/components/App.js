import React from 'react'
import Navbar from './Navbar';
import About from './About';
import Contact from './Contact';
import Login from './Login';
import Signup from './Signup';
import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import './App.css'
function App(){
  return(
    <>
      <Navbar />
      <Routes>
      <Route path='/' element={<Home />}></Route>
      <Route path='/about' element={<About />}></Route>
      <Route path='/contact' element={<Contact />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      </Routes>



      {/* <Route path='/about'>
        <About />
      </Route>

      <Route path='/contact'>
        <Contact />
      </Route>

      <Route path='login'>
        <Login />
      </Route>

      <Route path='signup'>
        <Signup />
      </Route> */}

    </>

  )
}

export default App;