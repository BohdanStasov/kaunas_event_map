import { useEffect, useState, useContext } from 'react';
import Map, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserPins } from '../redux/pinSlice';
import { IoIosPin } from 'react-icons/io';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { MdAccessTime } from 'react-icons/md'; 
import { MdOutlineCalendarMonth } from 'react-icons/md';
import { BiCommentDetail } from 'react-icons/bi'; 
import { useStateContext } from '../context/StateContext';
import MapNavbar from '../components/navbar/MapNavbar';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { toast } from 'react-toastify';
import Calendar from '../components/map/Calendar';

const MyPin = () => {
    const {selectedDate, setSelectedDate} = useStateContext();
    const [isOpenCalendar, setIsOpenCalendar] = useState(false)
    const {isOpenMapMenu, setIsOpenMapMenu} = useStateContext();
    const {isOpenMapSubMenu, setIsOpenMapSubMenu} = useStateContext();
    const pins = useSelector((state) => state.pins);
    const [event, setEvent] = useState("");
    const [place, setPlace] = useState("");
    const [time, setTime] = useState("");
    const [desc, setDesc] = useState("");
    const [currentPlaceId, setCurrentPlaceId] = useState(null); 
    const [newPinId, setNewPinId] = useState(null); 
    const {newPin, setNewPin} = useStateContext();
    const {isOpenNewPin, setIsOpenNewPin} = useStateContext();
    const { currentUser } = useSelector(state=>state.user); 
    const [uploadedPhotos, setUploadedPhotos] = useState([]);
    const handleFileUpload = (e) => {
      const files = e.target.files;
      const filesArr = Array.from(files);
    
      const readerPromises = filesArr.map((file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => {
            resolve(event.target.result);
          };
          reader.onerror = (error) => {
            reject(error);
          };
          reader.readAsDataURL(file);
        });
      });
    
      Promise.all(readerPromises)
        .then((results) => {
          setUploadedPhotos((prevPhotos) => [...prevPhotos, ...results]);
        })
        .catch((error) => {
          console.error('Error reading files:', error);
        });
    };
    const dispatch = useDispatch();
    useEffect(() => {
      toast.info('Click "set marker" in menu to add your pin');
      dispatch(fetchUserPins(currentUser._id));
    }, [dispatch]);
    const handleMarkerClick = (id) => {
      setCurrentPlaceId(id);
      setIsOpenMapSubMenu(false);
      setIsOpenMapMenu(false);
      setIsOpenNewPin(false);
    }; 
    const handleAddPinClick = () => { 
      setNewPin({
        lat: 54.9,
        long: 23.9,
      })
      setIsOpenMapSubMenu(false);
      setIsOpenMapMenu(false);
    }
    const handleNewMarkerClick = (id) => {
      setNewPinId(id);
      setIsOpenNewPin(true);
      setIsOpenMapSubMenu(false);
      setIsOpenMapMenu(false);
      setCurrentPlaceId(null);
    }
    const addNewPin = async (e) => {
      e.preventDefault();
    try {
        if (selectedDate === '') {
          toast.error('Please select a date');
          return;
        }
        const res = await axios.post("api/users/adduserpin", { event, place, time, date: selectedDate, desc, lat: newPin.lat,
        long: newPin.long, username: currentUser.username, userId: currentUser._id, images: uploadedPhotos,});
        setIsOpenNewPin(false);
        dispatch(fetchUserPins(currentUser._id));
        toast.success("Pin successfully created!");
      } catch (error) {
        console.log(error)
        toast.error("You have to fill in all the information about the pin")
      }
    }
    return (
      <>
        <Map
          initialViewState={{
            latitude: 54.9,
            longitude: 23.9,
            zoom: 12
          }}
          style={{width: "100vw", height: "100vh",}}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={import.meta.env.VITE_REACT_APP_MAPBOX}
          onDblClick={handleAddPinClick}
          onDrag={() => {
            setIsOpenNewPin(false);
            setIsOpenMapMenu(false);
            setIsOpenMapSubMenu(false);
            setCurrentPlaceId(null);
          }}
        >    
          {pins.map((p)=>(
          <>
            <Marker 
              longitude={p.long} 
              latitude={p.lat}
              >
              <IoIosPin  
                style={{cursor: "pointer", color: "red", fontSize: "25px"}}   
                onClick={() => {
                handleMarkerClick(p._id);}}
              />
            </Marker>                
              {p._id === currentPlaceId && (                    
                <div className='popupMyPin'
                  onClose={() => setCurrentPlaceId(null)}
                >  
                  <button className='closePin' onClick={() => 
                    setCurrentPlaceId(null)}
                  >
                    close pin
                  </button>    
                  {p.images.length > 0 && (
                    <Swiper className='swiper-container1'>
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
                </div>            
              )}        
          </>  
        ))} 
        {newPin && (
          <Marker 
          longitude={newPin.long} 
          latitude={newPin.lat}
          draggable={true}
          onDragEnd={(event) => {
            setNewPin({
              lat: event.lngLat.lat,
              long: event.lngLat.lng,
            });
          }}
          onDrag={() => {
            setIsOpenNewPin(false);
            setIsOpenMapMenu(false);
            setIsOpenMapSubMenu(false);
          }}
          >
          <IoIosPin  
            style={{cursor: "pointer", color: "rgb(255, 128, 0)", fontSize: "25px"}}   
            onClick={() => {
              handleNewMarkerClick(newPin)
            }}
          />
        </Marker>
        )}
        {isOpenNewPin && newPinId && (
          <>
            <div className='newPinPopup'
              onClose={() => {
                setIsOpenNewPin(false);              
              }}
            >  
              <button className='closePin' onClick={() => {
                setNewPinId(null)}}
              >
                close pin
              </button>       
              <Swiper className='swiper-container2'>
              {uploadedPhotos.map((photo, index) => (
                <SwiperSlide key={index}>
                  <img src={photo} alt={`Uploaded Photo ${index}`} className="slide_image" />
                </SwiperSlide>
              ))}
              </Swiper>  
              <div className='details-container'>
                <h1 className='details-event'>Event</h1>
                <input className='newPinInputEvent' value={event} onChange={(e)=>setEvent(e.target.value)}/>
              </div> 
              <div className='details-container'>
                <IoIosPin className='details-icon'/>
                <input className='newPinInput' value={place} onChange={(e)=>setPlace(e.target.value)}/>
              </div>
              <div className='details-container'>
                <MdAccessTime className='details-icon'/>
                <input className='newPinInput' value={time} onChange={(e)=>setTime(e.target.value)}/> 
              </div>
              <div className='details-container'>
                <button className='details-icon' onClick={() => {
                  setIsOpenCalendar(true);
                  }}>
                  <MdOutlineCalendarMonth/>
                </button>
                <p className='details-date'>{selectedDate}</p>
              </div>
              <div className='details-container'>
                <BiCommentDetail className='details-icon'/>
                <textarea
                  value={desc}
                  onChange={(e)=>setDesc(e.target.value)}
                  rows={3}
                  className='messageInput'
                />
              </div> 
              <label htmlFor="fileInput" className="fileInputLabel">
                <input
                  id="fileInput"
                  type="file"
                  accept="jpg/png"
                  onChange={handleFileUpload}
                  className="fileInput"
                />
                <div className="fileInputIcon">
                  <HiOutlinePhotograph />
                </div>
              </label>
              <button onClick={addNewPin} className='newPinBtn'>Add new Pin</button> 
              {isOpenCalendar && 
                <div className='newPinPopupCalendar'>
                  <button className='exitBtn' onClick={() => {
                    setIsOpenCalendar(false)}}
                  >
                    back to pin
                  </button>
                  <div className='calendarContainer'>
                    <Calendar/>
                  </div>
                </div>
              }
            </div>
          </>
        )}  
        <MapNavbar/>         
        </Map> 
        <style>
          {`
            .popupMyPin{
              position: relative; 
              width: 400px;
              height: 440px; 
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
            .eventName{
              margin-top: 5px;
              text-align: center;
              font-size: 24px;
              font-weight: bold;
            }
            .details-container {
              display: flex;
              align-items: center;
              margin-left: 15px;
            }
            .details-icon{
              color: red;
              font-size: 24px;
            }
            .details-event{
              color: red;
              font-size: 22px;
            }
            .details-text{
              font-size: 24px;
              padding-left: 5px;
            }
            .userpinsContainer {
              height: 100vh;
              width: 100vw;
              background-color: white;
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
            }
            .newPinPopup {             
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
            .newPinPopupCalendar{
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background-color: white;
              border-radius: 2rem;
              z-index: 1;
              align-items: center;
              justify-content: center;
            }
            .calendarContainer{
              margin-top: 50px;
              margin-left: auto;
              margin-right: auto;
              width: 10px;
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
            .swiper-container1{
              width: 90%;
              height: 180px;
              border-radius: 2rem;
              overflow: hidden;   
              margin-top: 10px;        
            }
            .swiper-container2{
              width: 90%;
              height: 180px;
              border-radius: 2rem;
              overflow: hidden;   
              margin-bottom: 10px;  
              margin-top: 5px;      
            }
            .slide_image{
              width: 100%;
              height: 100%;
              object-fit: cover;
              border-radius: 2rem;
            }
            .fileInputLabel {
              margin-bottom: 6px;
              margin-left: 15px;
              width: 24px;
            }       
            .fileInput {
              display: none;
            }  
            .fileInputIcon {
              color: red;
              font-size: 24px;
              cursor: pointer;
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
            .details-date{
              margin-left: 10px;
              font-size: 16px;
            }
            .messageInput{
              width: 300px;
              border-color: #aaa6c3;
              background-color: white;
              border-radius: 0.5rem;
              margin-left: 10px;
              border-width: 2px;
              resize: none;
              padding-left: 10px;
              font-size: 16px;
            }
            .newPinInput{
              width: 300px;
              border-color: #aaa6c3;
              background-color: white;
              border-radius: 0.5rem;
              margin-left: 10px;
              border-width: 2px;
              resize: none;
              padding-left: 10px;
              height: 30px;
              font-size: 16px;
            }
            .newPinInputEvent{
              width: 264px;
              border-color: #aaa6c3;
              background-color: white;
              border-radius: 0.5rem;
              margin-left: 10px;
              border-width: 2px;
              resize: none;
              padding-left: 10px;
              height: 30px;
              font-size: 16px;
            }
            .newPinBtn{
              display: block;
              margin: 5px auto;
              border-color: red;
              border-width: 3px;
              border-style: solid;
              border-radius: 2rem;
              background-color: transparent; 
              padding-left: 10px;
              margin-bottom: 5px;
              cursor: pointer;
              background-color: red;
              color: white;
              font-size: 20px;
              width: 190px;
              height: 40px;
            }
            @media (max-width: 767px) {
              .newPinPopup {
                width: 300px;
              }
              .popupMyPin {
                width: 300px;
              }
              .newPinInput {
                width: 200px;
              }
              .newPinInputEvent{
                width: 164px
              }
              .messageInput{
                width: 200px;
              }
            }
          `}
        </style> 
      </>
    )
  }
  
  export default MyPin
