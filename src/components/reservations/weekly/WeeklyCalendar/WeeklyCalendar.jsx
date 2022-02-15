import React from 'react';
import './WeeklyCalendar.css';
import { addDays, format, startOfWeek } from 'date-fns';
import { weeklyCalendarRoomColumn } from './WeeklyCalendarRoomColumn';
import { DateSwitcher } from '../DateSwitcher';


// TODO: APIから会議室のリストを取得したものを使うようにしたら削除
const dummyRooms = [
  {
    id: 0,
    name: '会議室1',
    reservations: [{
      startDateTime: '2022-01-28T14:00:00',
      endDateTime: '2022-01-28T15:00:00',
      reserverName: '泉水',
      guestName: '',
    },
    {
      startDateTime: '2022-01-28T17:00:00',
      endDateTime: '2022-01-28T20:00:00',
      reserverName: '泉水',
      guestName: '小田',
    },],
  },
  {
    id: 1,
    name: '会議室2',
    reservations: [],
  },
  {
    id: 2,
    name: '会議室3',
    reservations: [],
  },
  {
    id: 3,
    name: '会議室4',
    reservations: [],
  },
  {
    id: 4,
    name: '会議室5',
    reservations: [],
  },
  {
    id: 5,
    name: '会議室6',
    reservations: [],
  },{
    id: 6,
    name: '会議室7',
    reservations: [],
  },{
    id: 7,
    name: '会議室8',
    reservations: [],
  },
];

export const WeeklyCalendar = ({ rooms = dummyRooms, selectedDate, onDateChange }) => {
  
  const ThisWeekStart = format(startOfWeek(selectedDate),"L/d")
  const mon = format(addDays((startOfWeek(selectedDate)), 1),"L/d")
  const thu = format(addDays((startOfWeek(selectedDate)), 2),"L/d")
  const wed = format(addDays((startOfWeek(selectedDate)), 3),"L/d")
  const thr = format(addDays((startOfWeek(selectedDate)), 4),"L/d")
  const fri = format(addDays((startOfWeek(selectedDate)), 5),"L/d")
  const sat = format(addDays((startOfWeek(selectedDate)), 6),"L/d")

  const Days = [
    {id: 0, Day: ThisWeekStart,},
    {id: 1, Day: mon,},
    {id: 2, Day: thu,},
    {id: 3, Day: wed,},
    {id: 4, Day: thr,},
    {id: 5, Day: fri,},
    {id: 6, Day: sat,},
  ]

  return (    
    <div className="weekly-calendar">
      <div className="weekly-calendar--header">
        <DateSwitcher selectedDate={selectedDate} onChange={onDateChange} />
        <div className='weekly-calendar--header-room'>
          <div className="weekly-calendar--time-spacer" />
          {rooms.map((room) => (
            <div className="weekly-calendar--room-label"key={room.id}>
              {room.name}
            </div>
          ))}
        </div>
      </div>
      <div className="weekly-calendar--body">
        <div className="weekly-calendar--times">
          {Days.map((Day) => (
            <div className="weekly-calendar--time"key={Day.id}>
              {Day.Day}
            </div>
          ))}
        </div>
        <div className="weekly-calendar--room-columns">
          {rooms.map((room) => (
            <weeklyCalendarRoomColumn
              reservations={room.reservations}
              key={room.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
