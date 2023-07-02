import React, { createContext, useContext, useState, useEffect} from 'react'

const Context = createContext()

export const StateContext = ({children}) => {
  const [eventCount, setEventCount] = useState(0);
  const [selectedDay, setSelectedDay] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [calendarMode, setCalendarMode] = useState(false);
  const [searchPinsMode, setSearchPinsMode] = useState(true);
  const [searchUsersMode, setSearchUsersMode] = useState(false);
  const [filteredPins, setFilteredPins] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPinType, setSelectedPinType] = useState(''); 
  const [selectedPinTypes, setSelectedPinTypes] = useState([]);
  const [selectedPins, setSelectedPins] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [activeComponent, setActiveComponent] = useState('');
  const [isOpenProfile, setIsOpenProfile] = useState(false);
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);
  const [isOpenMyPin, setIsOpenMyPin] = useState(false);
  const [newPin, setNewPin] = useState(null);
  const [ isOpenMapSubMenu, setIsOpenMapSubMenu ] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isOpenSubMenu, setIsOpenSubMenu] = useState(false);
  const [isOpenMapMenu, setIsOpenMapMenu] = useState(false);
  const [isOpenNewPin, setIsOpenNewPin] = useState(false);
  const [isOpenSearchMode, setIsOpenSearchMode] = useState(false);
  const [isOpenReset, setIsOpenReset] = useState(false);
  return (
    <Context.Provider 
      value={{
        eventCount,
        selectedDate,
        selectedDay,
        calendarMode,
        searchUsersMode,
        searchPinsMode,
        selectedUser,
        filteredPins,
        searchQuery,
        isOpenSearchMode,
        selectedPinType,
        isOpenProfile,
        isOpenLogin,
        isOpenRegister,
        isOpenMyPin,
        activeComponent,
        selectedPinTypes,
        selectedPins,
        newPin,
        isOpenMapSubMenu,
        isOpenMenu,
        isOpenSubMenu,
        isOpenMapMenu,
        isOpenNewPin,
        isOpenReset,
        setEventCount,
        setSelectedDate,
        setSelectedDay,
        setCalendarMode,
        setSearchPinsMode,
        setSearchUsersMode,
        setSelectedUser,
        setFilteredPins,
        setSearchQuery,
        setIsOpenSearchMode,
        setIsOpenProfile,
        setIsOpenLogin,
        setIsOpenRegister,
        setIsOpenMyPin,
        setActiveComponent,
        setSelectedPinType,
        setSelectedPins,
        setSelectedPinTypes,
        setNewPin,
        setIsOpenMenu,
        setIsOpenSubMenu,
        setIsOpenMapSubMenu,
        setIsOpenMapMenu,
        setIsOpenNewPin,
        setIsOpenReset,
    }}>
        {children}
    </Context.Provider>
  )
}

export const useStateContext = () => useContext(Context);