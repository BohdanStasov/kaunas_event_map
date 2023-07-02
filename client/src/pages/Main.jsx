import { useEffect, useState, useContext } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import Hero from '../components/main/Hero';
import MapSection from '../components/main/MapSection';
import Navbar from '../components/navbar/Navbar';
import { useStateContext } from '../context/StateContext';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';
import Contact from '../components/main/Contact';

const Main = () => {
  const { isOpenLogin, isOpenRegister, isOpenReset } = useStateContext();
  return (
    <>
      <Navbar/>
      <div className='relative z-0'>
        <Hero/>
        <MapSection/>
        <Contact/>
      </div>  
      {isOpenLogin && <Login/>}
      {isOpenRegister && <Register/>}
    </>
  )
}

export default Main