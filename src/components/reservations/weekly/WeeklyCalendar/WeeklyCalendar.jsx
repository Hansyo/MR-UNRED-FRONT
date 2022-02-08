import React from 'react';
import './WeeklyCalendar.css';
import { weeklyCalendarRoomColumn } from './WeeklyCalendarRoomColumn';
import { DateSwitcher } from '../DateSwitcher';


// TODO: APIから会議室のリストを取得したものを使うようにしたら削除
const dummyRooms = [
  {
    id: 0,
    name: '会議室1',
    reservations: [],
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
          {.map((Day) => (
            <div className="weekly-calendar--time" key={Day}>
              {Day}
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
