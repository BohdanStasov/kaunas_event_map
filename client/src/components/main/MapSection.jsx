import { useEffect, useState } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BsSearch } from 'react-icons/bs';
import { IoIosPin } from 'react-icons/io';
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { MdAccessTime } from 'react-icons/md'; 
import { FaUserAlt } from 'react-icons/fa'; 
import { BiCommentDetail } from 'react-icons/bi';  
import { useSelector, useDispatch } from 'react-redux';
import { fetchPins, likePin, dislikePin, fetchSelectedPins, fetchUserPinsByUsername, fetchPinsByDate } from '../../redux/pinSlice';
import { useStateContext } from '../../context/StateContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import SearchComponent from '../map/SearchComponent';

const MapSection = () => {
  const [isOpenLikeList, setIsOpenLikeList] = useState(false);
  const { selectedDate, 
    selectedPins, 
    selectedUser, 
    isOpenSearchMode,  
  } = useStateContext();
  const {setIsOpenMenu, setIsOpenSearchMode, setIsOpenSubMenu} = useStateContext();
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const pins = useSelector((state) => state.pins);
  const currentUser = useSelector((state) => state.user.currentUser);
  const currentPin = pins.find((pin) => pin._id === currentPlaceId);
  const [markerLat, setMarkerLat] = useState(54.9);
  const [markerLng, setMarkerLng] = useState(23.9);
  const dispatch = useDispatch();  
  useEffect(() => {
    if (selectedUser === ''  && selectedPins.length === 0 && selectedDate === '') {
      dispatch(fetchPins());
    } 
    else if (selectedPins.length !== 0 ) {
      dispatch(fetchSelectedPins(selectedPins));    
    } 
    else if (selectedUser !== '' ) {
      dispatch(fetchUserPinsByUsername(selectedUser));    
    } 
    else if (selectedDate !== '' ) {
      dispatch(fetchPinsByDate(selectedDate))
    }
  }, [dispatch, selectedUser, selectedPins, selectedDate]);
  const handleMarkerClick = (id, lat, long) => {
    setCurrentPlaceId(id);
    setMarkerLat(lat);
    setMarkerLng(long)
  };
  const handleLike = async () => {
    await dispatch(likePin(currentPlaceId));
    if (selectedUser === ''  && selectedPins.length === 0 && selectedDate === '') {
      dispatch(fetchPins());
    } 
    else if (selectedPins.length !== 0 ) {
      dispatch(fetchSelectedPins(selectedPins));    
    } 
    else if (selectedUser !== '' ) {
      dispatch(fetchUserPinsByUsername(selectedUser));    
    }
    else if (selectedDate !== '' ) {
      dispatch(fetchPinsByDate(selectedDate));    
    }  
  };
  const handleDislike = async () => {
    await dispatch(dislikePin(currentPlaceId));
    if (selectedUser === ''  && selectedPins.length === 0 && selectedDate === '') {
      dispatch(fetchPins());
    } 
    else if (selectedPins.length !== 0 ) {
      dispatch(fetchSelectedPins(selectedPins));    
    } 
    else if (selectedUser !== '' ) {
      dispatch(fetchUserPinsByUsername(selectedUser));    
    } 
    else if (selectedDate !== '' ) {
      dispatch(fetchPinsByDate(selectedDate));    
    } 
  };
  return (
    <>
    <div id="mapComponent" className='h-screen flex justify-center items-center relative z-0 mx-auto'>
      <div className='MapContainer'>
        <Map
          initialViewState={{
            latitude: markerLat,
            longitude: markerLng,
            zoom: 12,

          }}
          onDrag={() => {
            setIsOpenSearchMode(false);
            setCurrentPlaceId(null);
            setIsOpenMenu(false);
            setIsOpenSubMenu(false);
          }}
          style={{width: "100%", height: "100%", borderRadius: "2rem",}}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={import.meta.env.VITE_REACT_APP_MAPBOX}
          
        > 
        <button className='MapSearchBtn' onClick={() => {
          setIsOpenSearchMode((prev) => !prev);
          setIsOpenMenu(false);
          setIsOpenSubMenu(false);
        }}>
          <BsSearch/>
        </button>
        {pins.map((p)=>(
        <>
          <Marker 
            latitude={p.lat}
            longitude={p.long}  
            >
            <IoIosPin  
              onClick={() => {handleMarkerClick(p._id, p.lat, p.long);}}  
              style={{cursor: "pointer", color: "red", fontSize: "25px"}}              
            />
          </Marker>   
          {p._id === currentPlaceId && (                         
            <div className='popup'
              onClose={() => setCurrentPlaceId(null)}
            > 
              <button className='closePin' onClick={() => {
                setCurrentPlaceId(null);}}
              >
                close pin
              </button>
              {p.images.length > 0 && (
                <Swiper className='swiper-container3'>
                  {p.images.map((image, index) => (
                    <SwiperSlide key={index}>
                      <img src={image} className="slide_image" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
              <h1 className='eventName'>{p.event}</h1>
              <div className='details-container'>
                <IoIosPin className='details-icon'/>
                <p className='details-text'>{p.place}</p>
              </div>
              <div className='details-container'>
                <MdAccessTime className='details-icon'/>
                <p className='details-text'>{p.time}</p>
              </div>
              <div className='details-container'>
                <MdOutlineCalendarMonth className='details-icon'/>
                <p className='details-text'>{p.date}</p> 
              </div> 
              <div className='details-container'>
                <BiCommentDetail className='details-icon'/>
                <p className='details-text'>{p.desc}</p> 
              </div> 
              <div className='details-container'>
                <button onClick={() => {setIsOpenLikeList(true)}}>
                  <FaUserAlt className='details-icon'/>
                </button>
                {currentPin.likes?.includes(currentUser?.username) ? (
                  currentPin.likes.length === 1 ? (
                    <p className='details-text'>me</p>
                  ) : (
                    <p className='details-text'>
                      me and 
                      <span className='details-text font-bold'>
                        <button onClick={() => {setIsOpenLikeList(true)}}>{currentPin.likes.length-1} more </button>
                      </span>
                    </p>
                  )
                ) : (
                  <p className='details-text '>
                    {currentPin.likes?.length}
                  </p>
                )}
              </div>              
              {currentUser && (
                <div className='buttonContainer'>
                  {currentPin.likes?.includes(currentUser?.username) ? (
                    <button onClick={handleDislike} className='popupButton'>
                      Cancel
                    </button>
                  ) : (
                    <button onClick={handleLike} className='popupButton'>
                      I will go
                    </button>
                  )}                         
                </div>
              )}
              {isOpenLikeList && 
                <div className='likelist'>
                  <button className='exitBtn' onClick={() => {
                    setIsOpenLikeList(false)}}
                  >
                    back to pin
                  </button>
                  <h1 className='eventName'>People going</h1>
                  <div className='likeslistcontainer'>
                    <infiniteScroll dataLength={currentPin.likes.length}>
                      {currentPin.likes.map((username) => {
                        return (
                          <div className='likelistitem'>
                            <p className='liklistusername'>{username}</p>
                          </div>
                        )
                      })}
                    </infiniteScroll>
                  </div>
                </div>
              }
            </div>     
          )}             
        </>  
      ))}
        </Map>  
        {isOpenSearchMode && 
          <SearchComponent/>
        }
      </div> 

    </div>
    <style>
        {`
          .MapContainer {
            width: 75vw;
            height: 75vh;
            border: 2px solid black;
            border-radius: 2rem;
            justify-content: center;
            align-items: center;
          }

          .MapLink {
            position: absolute;
            top: 1rem;
            left: 1rem;
            padding: 0.5rem 1rem;
            background-color: transparent;
            border: none;
            border-radius: 0.5rem;
            font-size: 2rem;
            cursor: pointer;
            color:red;
          }
          .MapSearchBtn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            padding: 0.5rem 1rem;
            background-color: transparent;
            border: none;
            border-radius: 0.5rem;
            font-size: 2rem;
            cursor: pointer;
            color:red;
          }
          .searchContainer{
            border-radius: 36px;
            border: 2px solid black;
            width: 50vw;
            height: 50vh;
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
          .closePin {
            display: flex;
            align-items: center;
            padding-top: 20px;
            padding-left: 20px;
            color: red;
            background-color: transparent;
            border: none;
            cursor: pointer;
            font-size: 15px;
          }
          .popup{
            position: relative; 
            width: 400px;
            height: 500px; 
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            z-index: 1; 
            background-color: white;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%); 
            border-radius: 2rem;
          }
          .likelist {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: white;
            border-radius: 2rem;
            z-index: 1;
          }
          .likeslistcontainer{
            margin-top: 15px;
            max-height: 340px;
            overflow-y: scroll;
            border-radius: 2rem;
          }
          .likeslistcontainer::-webkit-scrollbar {
            width: 6px;
          }
          .likeslistcontainer::-webkit-scrollbar-button {
            display: none;
          }
          .likeslistcontainer::-webkit-scrollbar-thumb{
            border-radius: 2rem;  
            background: #DCDCDC;  
          }
          .likeslistcontainer::-webkit-scrollbar-track{
            width: 10px;

          }
          .likelistitem{
            background-color: #f3f3f3;
            border-radius: 2rem;
            width: 90%;
            height: 30px;
            margin-top: 8px;
            margin-left: 15px;
            
          }
          .liklistusername{
            display: flex;
            height: 100%;
            align-items: center; 
            margin-left: 10px;
          }
          .eventName{
            margin-top: 5px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
          }
          .details-container {
            display: flex;
            align-items: center;
            margin-bottom: 6px;
            margin-left: 15px;
          }
          .details-icon{
            color: red;
            font-size: 24px;
          }
          .details-text{
            font-size: 24px;
            padding-left: 5px;
          }
          .buttonContainer{
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .popupButton{
            text-align: center;
            color: white;
            background-color: red;  
            cursor: pointer;
            border-radius: 2rem;
            border-color: transparent;
            font-size: 20px;
            width: 90px;
            height: 40px;
            margin-bottom: 5px;
          }
          .swiper-container3{
            margin-top: 5px;
            width: 90%;
            height: 180px;
            border-radius: 2rem;
            overflow: hidden;
            margin-top: 10px;
          }
          .slide_image{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 2rem;
          }
          @media (max-width: 767px) {
            .popup {
              width: 80%;
            }
          }
        `}
    </style> 
    </>
  )
}

export default MapSection