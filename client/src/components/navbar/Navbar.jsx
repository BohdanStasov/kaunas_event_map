import React, {useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegUserCircle } from 'react-icons/fa';
import { useStateContext } from '../../context/StateContext';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/userSlice';
import { RiMenu5Line } from 'react-icons/ri';
import { VscChromeClose } from 'react-icons/vsc';

const Navbar = () => {
  const { activeComponent, setActiveComponent, isOpenLogin, setIsOpenLogin, isOpenRegister, setIsOpenRegister } = useStateContext();
  const { currentUser } = useSelector((state) => state.user);
  const {isOpenMenu, setIsOpenMenu} = useStateContext();
  const {isOpenSubMenu, setIsOpenSubMenu} = useStateContext();
  const {isOpenSearchMode, setIsOpenSearchMode} = useStateContext();
  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    dispatch(logout());
    setIsOpenSubMenu(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      const heroComponent = document.getElementById('heroComponent');
      const mapComponent = document.getElementById('mapComponent');
      const contactComponent = document.getElementById('contactComponent');
  
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
  
      const heroComponentTop = heroComponent.offsetTop;
      const mapComponentTop = mapComponent.offsetTop;
      const mapComponentBottom = mapComponent.offsetTop + mapComponent.offsetHeight;
      const contactComponentTop = contactComponent.offsetTop;
      const contactComponentBottom = contactComponent.offsetTop + contactComponent.offsetHeight;
  
      let activeComponent = '';
  
      if (
        scrollTop >= heroComponentTop &&
        scrollTop < mapComponentTop - windowHeight / 2.5
      ) {
        activeComponent = '';
      } else if (
        scrollTop >= mapComponentTop - windowHeight / 2 &&
        scrollTop < contactComponentTop - windowHeight / 2
      ) {
        activeComponent = 'map';
      } else if (
        scrollTop >= contactComponentTop - windowHeight / 2 &&
        scrollTop < contactComponentBottom - windowHeight / 2
      ) {
        activeComponent = 'contact';
      } else {
        activeComponent = '';
      }
  
      setActiveComponent(activeComponent);
  
      // close menus on scroll
      setIsOpenSubMenu(false);
      setIsOpenMenu(false);
    };
  
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  
  return (
    <>
        <nav className='nav'>
          <div className='Container'>
            <Link 
              to={"/"}
              className="flex items-center gap-2"
              onClick={() => {
                  window.scrollTo(0, 0);
              }}
            >
              <p className='text-black text-[18px] font-bold cursor-pointer'>Kaunas Event Map</p>
            </Link>
            <ul className='list-none hidden sm:flex flex-row gap-10'>
              <li className={` ${activeComponent === 'map' ? 'text-black' : 'text-secondary'} text-[18px] font-medium cursor-pointer`}
                onClick={(e) => {
                  e.preventDefault();
                  const mapComponent = document.getElementById('mapComponent');
                  mapComponent.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                  <a>Map</a>
              </li>
              <li className={` ${activeComponent === 'contact' ? 'text-black' : 'text-secondary'} text-[18px] font-medium cursor-pointer`}
                onClick={(e) => {
                  e.preventDefault();
                  const contactComponent = document.getElementById('contactComponent');
                  contactComponent.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                  <a>Contact</a>
              </li>
                        
              {currentUser ? (
                <a
                  onClick={() => {
                    setIsOpenSubMenu(!isOpenSubMenu);
                    setIsOpenSearchMode(false);
                  }}
                  className='ProfileIcon'>
                  <FaRegUserCircle className={`${
                    isOpenSubMenu ? "text-black" : "text-secondary"
                    } hover:text-black cursor-pointer`}
                    />
                </a>
                ) : (
                  <a onClick={() => {
                    setIsOpenLogin(true);
                    setActiveComponent('');
                  }}  className={`${
                    isOpenLogin || isOpenRegister ? "text-black" : "text-secondary"
                    } hover:text-black text-[18px] font-medium cursor-pointer`}>
                    Sign In
                  </a>
                )
              }
            </ul>
            {/*   PHONE MODE   */}
            <div className='sm:hidden flex flex-1 justify-end items-center'>
                    {isOpenMenu || isOpenSubMenu ? (
                        <VscChromeClose
                            className='w-[28px] h-[28px] object-contain cursor-pointer'
                            onClick={() => {
                              setIsOpenMenu(false);
                              setIsOpenSubMenu(false);
                            }}/>
                    ) : (
                        <RiMenu5Line
                            className='w-[28px] h-[28px] object-contain cursor-pointer'
                            onClick={() => setIsOpenMenu(true)}/>
                    )} 
                    <div
                      className={`${ !isOpenMenu ? "hidden" : "flex" } 
                      p-6 bg-white absolute top-20 left-1/2 transform -translate-x-1/2 mx-4 my-2 min-w-[250px] z-10 rounded-xl border border-black`
                      }
                    >
                      <ul className='list-none flex justify-end items-center flex-1 flex-col gap-4'>
                        <li
                            className='text-secondary font-poppins font-medium cursor-pointer text-[18px]'
                            onClick={(e) => {
                              e.preventDefault();
                              const mapComponent = document.getElementById('mapComponent');
                              mapComponent.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            <a>Map</a>
                        </li>
                        <li
                            className='text-secondary font-poppins font-medium cursor-pointer text-[18px]'
                            onClick={(e) => {
                              e.preventDefault();
                              const contactComponent = document.getElementById('contactComponent');
                              contactComponent.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            <a>Contact</a>
                        </li>
                        {currentUser ? (
                          <li
                              className='text-secondary font-poppins font-medium cursor-pointer text-[18px]'
                              onClick={() => {
                                setIsOpenMenu(false)
                                setIsOpenSubMenu(true);
                              }}
                          >
                            <a>Profile</a>
                          </li>
                        ) : (
                          <a onClick={() => {
                            setIsOpenLogin(true);
                          }}  className={`${
                            isOpenLogin || isOpenRegister ? "text-black" : "text-secondary"
                            } hover:text-black text-[18px] font-medium cursor-pointer`}>
                            Sign In
                          </a>
                        )}
                      </ul>
                    </div>
                </div> 
          </div>
          <div
            className={`${ !isOpenSubMenu ? "hidden" : "flex" } 
            p-6 bg-white absolute top-20 left-1/2 transform -translate-x-1/2 mx-4 my-2 min-w-[250px] z-10 rounded-xl flex justify-end items-center flex-col border border-black`
            }
          >
            <Link to='/my-pins'>
              <button onClick={() => {
                setIsOpenMenu(false);
                setIsOpenSubMenu(false);
              }} className='subMenuBtn'>add my pin</button>
            </Link>
            <Link to="/">
              <button className='exitBtnMain' onClick={(handleLogoutClick)}>log out</button>
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
          z-index: 1;
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
          background-color: transparent;
          border: none;
          cursor: pointer;
          color: rgba(0, 125, 181, 1);
          font-weight: bold;
        }
        .exitBtnMain{
          padding-top: 5px;
          background-color: transparent;
          border: none;
          cursor: pointer;
          color: red;
          font-weight: bold;
        }
        `}
    </style> 
    </>
  )
}

export default Navbar