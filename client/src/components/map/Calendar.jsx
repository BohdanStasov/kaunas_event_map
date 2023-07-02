import { useState } from 'react';
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameMonth,
    isToday,
    parse,
    startOfToday,
    toDate,
} from 'date-fns'
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io'
import { useStateContext } from '../../context/StateContext';
import { useSelector } from 'react-redux';

const Calendar = () => { 
    const today = startOfToday();
    const {isOpenSearchMode, setIsOpenSearchMode} = useStateContext();
    const [isOpenEventList, setIsOpenEventList] = useState(false);
    const {eventCount, setEventCount} = useStateContext();
    const {selectedDay, setSelectedDay} = useStateContext();
    const {setSelectedUser, setSelectedPins} = useStateContext();
    const {selectedDate, setSelectedDate} = useStateContext();
    const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
    const pins = useSelector((state) => state.pins);
    const filteredPins = pins.filter((pin) => pin.date === selectedDate);
    setEventCount(filteredPins.length);
    function handleSelectDate(day) {
        setSelectedDate(format(day, "MMM d yyyy"));
        setSelectedDay(day);
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    } 
    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    }) 
    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }
    return (
        <div className='mt-[-28px] ml-[-120px] w-[250px] mh-[350px] bg-white rounded-2xl'>
            {isOpenEventList && 
                <div className='absolute w-[250px] h-[390px] mt-3 mr-4 bg-white rounded-2xl'>
                    <button onClick={() => {setIsOpenEventList(false)}} className='ml-6 mt-2 text-red'>exit</button>
                    <div className='eventslistcontainer'>
                        <infiniteScroll dataLength={filteredPins.length}>
                            {filteredPins.map((p) => {
                                return (
                                    <div className='eventlistitem'>
                                        <button onClick={() => {
                                            setIsOpenSearchMode(false);
                                            setSelectedDate('');
                                            setSelectedDay('');
                                            setSelectedPins([p._id]);
                                        }}>
                                            <p className='eventlistevent'>{p.event}</p>
                                        </button> 
                                    </div>
                                )
                            })}
                        </infiniteScroll>
                    </div>
                    
                </div>
            }
            <div className="pt-2 pl-2 pr-2 flex items-center">
                <h2 className="flex-auto font-semibold text-gray-900">
                    {format(firstDayCurrentMonth, 'MMMM yyyy')}
                </h2>
                <button
                    type="button"
                    onClick={previousMonth}
                    className="flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Previous month</span>
                    <IoIosArrowDropleft className="w-6 h-6" aria-hidden="true" />
                </button>
                <button
                    onClick={nextMonth}
                    type="button"
                    className="flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                >
                    <span className="sr-only">Next month</span>
                    <IoIosArrowDropright className="w-6 h-6" aria-hidden="true" />
                </button>
            </div>
            {selectedDate !== '' && location.pathname === '/' &&
                <div className='pl-2 pt-2'>
                    {eventCount > 0 ? (
                        <>
                            {eventCount === 1 ? (
                                <button onClick={() => {setIsOpenEventList(true)}}>
                                    <h1 className='underline decoration-solid'>{eventCount} event on {selectedDate}</h1>
                                </button>
                            ) : (
                                <button onClick={() => {setIsOpenEventList(true)}}>
                                    <h1 className='underline decoration-solid'>{eventCount} events on {selectedDate}</h1>
                                </button>
                            )}
                        </>
                    ) : (
                        <h1>{eventCount} events on {selectedDate}</h1>
                    )}
                </div>
            }
            <div className="grid grid-cols-7 mt-2 text-xs leading-6 text-center text-gray-500">
                <div>M</div>
                <div>T</div>
                <div>W</div>
                <div>T</div>
                <div>F</div>
                <div className='text-red'>S</div>
                <div className='text-red'>S</div>
            </div>
            <div className="grid grid-cols-7 mt-2 text-sm">
                {days.map((day, dayIdx) => (
                    <div
                        key={day.toString()}
                        className={classNames(
                        dayIdx === 0 && colStartClasses[getDay(day) === 0 ? 6 : getDay(day) - 1],
                        'py-1.5'
                        )}
                    >
                        <button
                            type="button"
                            onClick={() => {
                                handleSelectDate(day);
                                setSelectedPins([]);
                                setSelectedUser('');
                            }}
                            className={classNames(
                                isEqual(toDate(day), selectedDay) && 'text-white',
                                !isEqual(toDate(day), selectedDay) && isToday(day) && 'text-red',
                                !isEqual(toDate(day), selectedDay) && !isToday(day) && isSameMonth(day, firstDayCurrentMonth) && 'text-gray-900',
                                !isEqual(toDate(day), selectedDay) && !isToday(day) && !isSameMonth(day, firstDayCurrentMonth) && 'text-gray-400',
                                isEqual(toDate(day), selectedDay) && isToday(day) && 'bg-red',
                                isEqual(toDate(day), selectedDay) && !isToday(day) && 'bg-red',
                                !isEqual(toDate(day), selectedDay) && 'hover:bg-red hover:text-white',
                                'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                            )}
                        >
                            <time dateTime={format(day, 'yyyy-MM-dd')}>
                                {format(day, 'd')}
                            </time>
                        </button>
                    </div>
                ))}
            </div>
            {selectedDate !== '' && 
                <button  onClick={() => {
                    setSelectedDate('');
                    setSelectedDay('');
                }} className='text-red pl-2 pb-2'
                >
                    clear
                </button>
            }
            <style>
                {`
                .eventslistcontainer{
                    max-height: 350px;
                    overflow-y: scroll;
                    border-radius: 2rem;
                }
                .eventslistcontainer::-webkit-scrollbar {
                    width: 6px;
                }
                .eventslistcontainer::-webkit-scrollbar-button {
                    display: none;
                }
                .eventslistcontainer::-webkit-scrollbar-thumb{
                    border-radius: 2rem;  
                    background: #DCDCDC;  
                }
                .eventslistcontainer::-webkit-scrollbar-track{
                    width: 10px;
    
                }
                .eventlistitem{
                    background-color: #f3f3f3;
                    border-radius: 2rem;
                    width: 90%;
                    height: 30px;
                    margin-top: 8px;
                    margin-left: 15px;
                    
                }
                .eventlistevent{
                    display: flex;
                    height: 100%;
                    align-items: center; 
                    margin-left: 10px;
                }
                `}
            </style>
        </div>
    )
}

let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]

export default Calendar

