import { useState } from 'react';
import { MdOutlineCancel, MdOutlineCalendarMonth } from 'react-icons/md';
import { GrAdd } from 'react-icons/gr'; 
import { FaUserAlt } from 'react-icons/fa'; 
import { IoIosPin } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { searchPins, searchUsers } from '../../redux/searchSlice';
import { useStateContext } from '../../context/StateContext';
import Calendar from './Calendar';

const SearchComponent = () => {
    const {calendarMode, setCalendarMode} = useStateContext();
    const {searchPinsMode, setSearchPinsMode} = useStateContext();
    const {searchUsersMode, setSearchUsersMode} = useStateContext();
    const [filteredPins, setFilteredPins] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const {selectedPins, setSelectedPins} = useStateContext();
    const {selectedDate, setSelectedDate} = useStateContext();
    const {selectedDay, setSelectedDay} = useStateContext();
    const {selectedUser, setSelectedUser} = useStateContext();
    const pins = useSelector((state) => state.pins);
    const search = useSelector((state) => state.search);
    const dispatch = useDispatch();    
    const removePinFromSearch = (pinId) => {
            setSelectedPins(prevPinTypes => prevPinTypes.filter(pin => pin !== pinId));
    };    
    const handlePinSelection = (pinId) => {
    setSelectedPins((prevSelectedPins) => {
        if (prevSelectedPins.includes(pinId)) {
        return prevSelectedPins.filter((id) => id !== pinId);
        } else {
        return [...prevSelectedPins, pinId];
        }
    });  
    setSelectedUser('');  
    setSelectedDate(''); 
    setSelectedDay('');           
    };
    const handleUserSelection = (username) => {
        if (selectedUser === username) {
            setSelectedUser('');
        } else {
            setSelectedUser(username);
        }
        setSelectedPins([]);
        setSelectedDate(''); 
        setSelectedDay('');
    };
    const handleSearchChange = (e) => {
        const searchQuery = e.target.value;
        const filteredResults = search.filter((pin) => {
            const pinTitle = pin.event;
            return pinTitle && pinTitle.includes(searchQuery.toLowerCase());
        });
        const filteredUsersResults = search.filter((user) => {
            const userName = user.username;
            return userName && userName.includes(searchQuery.toLowerCase());
        });       
        setFilteredPins(filteredResults);
        setFilteredUsers(filteredUsersResults);
        setSearchQuery(searchQuery);
        
        if (searchPinsMode && searchQuery.length >= 3) { 
            dispatch(searchPins(searchQuery));
        } else if (searchUsersMode && searchQuery.length >= 3) {
            dispatch(searchUsers(searchQuery));
        } else {
            setFilteredPins([]);
            setFilteredUsers([]);
        }
    };
    const handleUserPinsMode = () => {
            setSearchPinsMode(false);
            setSearchUsersMode(true);
            setCalendarMode(false);
    }
    const handlePinsMode = () => {
            setSearchPinsMode(true);
            setSearchUsersMode(false);
            setCalendarMode(false);
    }
    const handleCalendarMode = () => {
            setSearchPinsMode(false);
            setSearchUsersMode(false);
            setCalendarMode(true);
    }
    return (
        <div className='bg-transparent absolute top-40 left-1/2'>
            <div className='mb-[30px] ml-[40px]'>
                <button onClick={handleCalendarMode} className={`${calendarMode ? "text-red" : "text-black"} text-[24px] mr-2`}> 
                    <MdOutlineCalendarMonth/>
                </button>
                <button onClick={handleUserPinsMode} className={`${searchUsersMode ? "text-red" : "text-black"} text-[22px] mr-2`}>
                    <FaUserAlt/>
                </button>
                <button onClick={handlePinsMode} className={`${searchPinsMode ? "text-red" : "text-black"} text-[26px]`}>
                    <IoIosPin/>
                </button>
            </div>
            <div className='absolute transform -translate-x-1/2 -translate-y-1/2'>   
                { searchPinsMode && 
                    <>
                        <input
                        type='text'
                        className='bg-white py-4 px-6 text-black rounded-lg outline-none border-none font-medium'
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search pins..."
                        /> 
                        {filteredPins.length === 0  && searchQuery.length === 0 ? (
                            <>
                                {selectedPins.length === 0 ? (
                                    <div></div>
                                ) : (
                                    <div className='mt-2 bg-white absolute top-14 flex flex-col items-start rounded-lg p-2 w-full'>
                                        {selectedPins.map((pinId) => {
                                            const pin = pins.find((pin) => pin._id === pinId);
                                            return (
                                            <div className='flex w-full justify-between' key={pin._id}>
                                                <div className='text-black font-bold'>{pin.event}</div>
                                                <button className='text-red font-bold' onClick={() => removePinFromSearch(pin._id)}>
                                                    <MdOutlineCancel/>
                                                </button>
                                            </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </>
                        ) : (
                            filteredPins.length === 0 ? (
                                <div></div>
                            ) : (
                                <div className='mt-2 bg-white absolute top-14 flex flex-col items-start rounded-lg p-2 w-full'>
                                    {filteredPins.slice(0, 5).map((search) => {
                                        const pinTitle = search.event;
                                        const regex = new RegExp(`(${searchQuery})`, 'gi');
                                        const highlightedTitle = pinTitle.replace(regex, '<b>$1</b>');
                                    
                                        const isSelected = selectedPins.includes(search._id);
                                    
                                        return (
                                        <div className={`flex w-full justify-between `} key={search.event}>
                                            <h3 dangerouslySetInnerHTML={{ __html: highlightedTitle }}></h3>
                                            <button
                                            className={`text-red font-bold ${isSelected ? 'text-red' : ''}`}
                                            onClick={() => handlePinSelection(search._id)}
                                            >
                                            {isSelected ? <MdOutlineCancel /> : <GrAdd />}
                                            </button>
                                        </div>
                                        );
                                    })}
                                </div>

                            )
                        )}
                    </> 
                } 
                { searchUsersMode && 
                    <>
                        <input
                        type='text'
                        className='bg-white py-4 px-6 text-black rounded-lg outline-none border-none font-medium'
                        value={searchQuery}
                        onChange={handleSearchChange}
                        placeholder="Search user's pins..."
                        /> 
                        {filteredUsers.length === 0  && searchQuery.length === 0 ? (
                            <>
                                {selectedUser === '' ? (
                                    <div></div>
                                ) : (
                                    <div className='mt-2 bg-white absolute top-14 flex flex-col items-start rounded-lg p-2 w-full'>
                                            <div className='flex w-full justify-between' key={selectedUser}>
                                                <div className='text-black font-bold'>{selectedUser}</div>
                                                    <button
                                                        className='text-red font-bold'
                                                        onClick={() => setSelectedUser('')}
                                                    >
                                                        <MdOutlineCancel />
                                                    </button>
                                            </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            filteredUsers.length === 0 ? (
                                <div></div>
                            ) : (
                                <div className='mt-2 bg-white absolute top-14 flex flex-col items-start rounded-lg p-2 w-full'>
                                    {filteredUsers.slice(0, 5).map((search) => {
                                        const userName = search.username;
                                        const regex = new RegExp(`(${searchQuery})`, 'gi');
                                        const highlightedTitle = userName.replace(regex, '<b>$1</b>');
                                    
                                        const isSelected = selectedUser === search.username;
                                    
                                        return (
                                        <div className={`flex w-full justify-between `} key={search.username}>
                                            <h3 dangerouslySetInnerHTML={{ __html: highlightedTitle }}></h3>
                                            <button
                                            className={`text-red font-bold ${isSelected ? 'text-red' : ''}`}
                                            onClick={() => handleUserSelection(search.username)}
                                            >
                                            {isSelected ? <MdOutlineCancel /> : <GrAdd />}
                                            </button>
                                        </div>
                                        );
                                    })}
                                </div>

                            )
                        )}
                    </> 
                }     
            </div>
            { calendarMode &&
                <>
                    <Calendar/>
                </>
            }
        </div>
    )
}

export default SearchComponent