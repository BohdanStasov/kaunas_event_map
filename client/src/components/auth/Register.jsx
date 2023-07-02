import React, { useState, useEffect } from 'react';
import { useStateContext } from '../../context/StateContext';
import axios from 'axios';
import { toast } from 'react-toastify'

const Register = () => {
  const { setIsOpenLogin, setIsOpenRegister } = useStateContext();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conPassword, setConPassword] = useState("");
  const handleRegisterClick = async (e) => {
    e.preventDefault();
    try {   
      if (password!=conPassword) {
        toast.error("Passwords don't match!")
      }
      else if (!username || !email || !password || !conPassword) {
        toast.error('Please fill in all fields!');
      }
      else {
        await axios.post(
          "api/auth/register",
          { username, email, password },   
        ) 
        setIsOpenRegister(false);
        setIsOpenLogin(true);
        toast.success("User created successfully!")
      }   
    } catch (error) {
      toast.error('Something went wrong, try to register later');
    }
  }
  useEffect(() => {
    document.documentElement.classList.add('overflow-hidden');
    return () => {
      document.documentElement.classList.remove('overflow-hidden');
    };
  }, []);
  return (
    <>
      <div className="overlay" >
        <div className='registerContainer fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 md:w-1/2 lg:w-1/3 xl:w-1/4'>
          <button className='exitBtn' onClick={() => {
            setIsOpenRegister(false)}}
          >
            exit
          </button>
          <h1 className='register text-center mt-1 font-bold'>Sign Up</h1>
          <div className='form'>  
              <h1 className='H1 font-medium'>Username</h1>          
              <input className='Input' value={username} onChange={(e)=>setUsername(e.target.value)}/>
              <h1 className='H1 font-medium'>Email</h1>          
              <input type='email' name='email' className='Input' value={email} onChange={(e)=>setEmail(e.target.value)}/>                   
              <h1 className='H1 font-medium'>Password</h1>
              <input type='password' className='Input' value={password} onChange={(e)=>setPassword(e.target.value)}/>
              <h1 className='H1 font-medium'>Confirm password</h1>
              <input type='password' className='Input' value={conPassword} onChange={(e)=>setConPassword(e.target.value)}/>
              <button className='Btn' onClick={handleRegisterClick}>Create</button>
              <button className='Btn2' onClick={() => {
                setIsOpenRegister(false)
                setIsOpenLogin(true)
              }}>back to login</button>
          </div> 
        </div> 
      </div>
      <style>
        {`
        .overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          z-index: 1;
        }
        .registerContainer {
          background-color: white;
          border-radius: 36px;
          border: 2px solid black;
        }
        .register {
          font-size: 27px;
        }
        .exitBtn {
          padding-top: 20px;
          padding-left: 20px;
          color: red;
          background-color: transparent;
          border: none;
          cursor: pointer;
          font-size: 15px;
          font-weight: 400;
        }
        .form {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-top: 10px;
          height: 100%;
          width: 100%;
        }
        .H1{
          font-size: 23px;
          color: black;
          text-decoration: none;         
        }
        .Input {
          width: 269px;
          height: 47px;
          width: 269px;
          border-color: black;
          border-width: 3px;
          border-style: solid;
          border-radius: 18px;
          background-color: transparent; 
          padding-left: 10px;
          margin-top: 7px
        }
        .Btn {
          max-width: 200px;
          height: 40px;
          width: 269px;
          border-color: black;
          border-width: 3px;
          border-style: solid;
          border-radius: 18px;
          background-color: transparent;
          padding-left: 10px;
          margin-top: 20px;
          margin-bottom: 7px;
          font-size: 20px;
          cursor: pointer;
          background-color: black;
          color: white;
        }
        .Btn2 {
          padding-bottom: 7px;
          background-color: transparent;
          border: none;
          cursor: pointer;
          color: rgba(0, 125, 181, 1);
          font-weight: bold;
        }
        `}
      </style>
    </>
  )
}

export default Register