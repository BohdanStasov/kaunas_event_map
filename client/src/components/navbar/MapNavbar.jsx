import React from 'react';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { useStateContext } from '../../context/StateContext';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/userSlice';
import { RiMenu5Line } from 'react-icons/ri';
import { VscChromeClose } from 'react-icons/vsc';
import { toast } from 'react-toastify';

const MapNavbar = () => {
  const {isOpenNewPin, setIsOpenNewPin} = useStateContext();
  const { isOpenLogin, setIsOpenLogin, isOpenRegister, setIsOpenRegister } = useStateContext();
  const {isOpenMapSubMenu, setIsOpenMapSubMenu} = useStateContext(); 
  const { currentUser } = useSelector((state) => state.user);
  const {isOpenMapMenu, setIsOpenMapMenu} = useStateContext();
  const {newPin, setNewPin} = useStateContext();
  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    dispatch(logout());
    setIsOpenSubMenu(false);
  };
  const handleAddPinClick = () => { 
    setNewPin({
      lat: 54.9,
      long: 23.9,
    })
    setIsOpenMapSubMenu(false);
    setIsOpenMapMenu(false);
    toast.info('Drag the marker to set new pin');
  }
  return (
    <>
        <nav className='nav'>
          <div className='Container'>
            <Link 
              to={"/"}
              className="flex items-center gap-2"
              onClick={() => {
                  window.scrollTo(0, 0);
                  setNewPin(null);
              }}
            >
              <p className='text-black text-[18px] font-bold cursor-pointer'>Kaunas Event Map</p>
            </Link>
            <ul className='list-none hidden sm:flex flex-row gap-10'>        
              {currentUser ? (
                <a
                  onClick={() => {
                    setIsOpenMapSubMenu(!isOpenMapSubMenu);
                    setIsOpenNewPin(false);
                  }}
                  className='ProfileIcon'>
                  <FaRegUserCircle className={`${
                    "text-black" 
                    } hover:text-black cursor-pointer`}
                    />
                </a>
                ) : (
                  <a onClick={() => {
                    setIsOpenLogin(true);
                  }}  className={`${
                    isOpenLogin || isOpenRegister ? "text-black" : "text-secondary"
                    } hover:text-black text-[18px] font-medium cursor-pointer`}>
                    Sign In
                  </a>
                )
              }
            </ul>
            <div className='sm:hidden flex flex-1 justify-end items-center'>
                    {isOpenMapMenu || isOpenMapSubMenu ? (
                        <VscChromeClose
                            className='w-[28px] h-[28px] object-contain cursor-pointer'
                            onClick={() => {
                                setIsOpenMapMenu(false);
                                setIsOpenMapSubMenu(false);
                            }}/>
                    ) : (
                        <RiMenu5Line
                            className='w-[28px] h-[28px] object-contain cursor-pointer'
                            onClick={() => {
                              setIsOpenMapMenu(true);
                              setIsOpenNewPin(false)
                            }}/>
                    )} 
                    <div
                      className={`${ !isOpenMapMenu ? "hidden" : "flex" } 
                      p-6 bg-white absolute top-20 left-1/2 transform -translate-x-1/2 mx-4 my-2 min-w-[250px] z-10 rounded-xl border border-black`
                      }
                    >
                      <ul className='list-none flex justify-end items-center flex-1 flex-col gap-4'>
                      <button onClick={handleAddPinClick}>
                        <p className='subMenuBtn'>set marker</p>
                      </button>
                        <Link to="/">
                          <button className='logOut' onClick={(handleLogoutClick)}>log out</button>
                        </Link>
                      </ul>
                    </div>
                </div> 
          </div>
          <div
            className={`${ !isOpenMapSubMenu ? "hidden" : "flex" } 
            p-6 bg-white absolute top-20 left-1/2 transform -translate-x-1/2 mx-4 my-2 min-w-[250px] z-10 rounded-xl flex justify-end items-center flex-col border border-black`
            }
          >
            <button onClick={handleAddPinClick}>
              <p className='subMenuBtn'>set marker</p>
            </button>
            <Link to="/">
              <button className='logOut' onClick={(handleLogoutClick)}>log out</button>
            </Link>
          </div>
          
        </nav>
        <style>
        {`
        .nav {
          width: 100%;
          display: flex;
          align-items: center;
          padding-top: 1.25rem;
          position: fixed;
          top: 0;
          z-index: 20;
          background-color: #primary;
          @media (min-width: 640px) {
              padding-left: 16px;
              padding-right: 16px;   
          }
          padding-left: 6px;
          padding-right: 6px;
        }        
        .Container{
          width: 100%;
          display: flex;
          justify-content: space-between; 
          align-items: center;
          max-width: 80rem;
          margin-left: auto;
          margin-right: auto;
        }
        .logo{
          color: black;
          font-size: 18px;
          font-weight: 700;
        }
        .ul{
          list-style: none; 
          display: none; 
          @media (min-width: 640px) {
            display: flex;
          }
          flex-direction: row; 
          gap: 1.6rem;
        }
        .li{
          font-size: 18px;
          font-weight: 500;
          cursor: pointer;
          transition: color 0.3s;
        }
        .a{
          margin-right: 2rem;
          color: black;
        }
        .link{
          color: black;
          font-weight: 300;
        }
        .ProfileIcon{
          font-size: 28px;
          vertical-align: middle;
        }
        .subMenuWrap{
          position: absolute;
          top: 100%;
          right: 6%;
          width: 120px;
          border: 2px solid black;
          border-radius: 24px;
          background-color: white;
        }
        .subMenu{
          padding: 20px;
          margin: 10px;
        }
        .userInfo{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;  
        }
        .subMenuBtn{ 
          padding-top: 5px;
          padding-bottom: 5px; 
          background-color: transparent;
          border: none;
          cursor: pointer;
          color: rgba(0, 125, 181, 1);
          font-weight: bold;
          font-size: 16px;
        }
        .logOut{
          padding-top: 5px;
          padding-bottom: 5px;  
          background-color: transparent;
          border: none;
          cursor: pointer;
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        `}
    </style> 
    </>
  )
}

export default MapNavbar