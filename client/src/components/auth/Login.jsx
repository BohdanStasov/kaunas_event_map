import React, {useEffect, useState } from 'react';
import { useStateContext } from '../../context/StateContext';
import { loginStart, loginSuccess, loginFailure } from '../../redux/userSlice';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify'

const Login = () => {
  const { setIsOpenLogin, setIsOpenRegister, isOpenRegister, setIsOpenReset } = useStateContext();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const handleLoginClick = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("api/auth/login", { username, password });
      dispatch(loginSuccess(res.data));
      setIsOpenLogin(false)
    } catch (error) {
      dispatch(loginFailure());
      toast.error("Incorrect credentials")
    }
  };
  useEffect(() => {
    document.documentElement.classList.add('overflow-hidden');
    return () => {
      document.documentElement.classList.remove('overflow-hidden');
    };
  }, []);
  return (
    <>
    <div className="overlay" >
      <div className="loginContainer fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4/5 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <button className='exitBtn' onClick={() => {
        setIsOpenLogin(false)}}
        >
          exit
        </button>
        <h1 className="login text-center mt-1 font-bold">Sign in</h1>
        <div className='loginForm'>  
            <h1 className='loginH1 font-medium'>Username</h1>          
            <input className='loginInput' value={username} onChange={(e)=>setUsername(e.target.value)}/>                 
            <h1 className='loginH1 font-medium'>Password</h1>
            <input type='password' className='loginInput' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className='loginBtn font-medium' onClick={handleLoginClick}>Login</button>
            <button className='loginBtn2' onClick={() => {
              setIsOpenLogin(false);
              setIsOpenRegister(true);
            }}
            >create account</button>
        </div>  
      </div></div>
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
        .loginContainer {
          background-color: white;
          border-radius: 36px;
          border: 2px solid black;
        }
        .login {
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
        .loginForm {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding-top: 10px;
          height: 100%;
          width: 100%;
        }
        .loginH1 {
          font-size: 23px;
          color: black;
          text-decoration: none;
        }
        .loginInput {
          height: 47px;
          width: 269px;
          border-color: black;
          border-width: 3px;
          border-style: solid;
          border-radius: 18px;
          background-color: transparent;
          padding-left: 10px;
          margin-top: 7px;
        }
        .loginBtn {
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
        .loginBtn2 {
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

export default Login