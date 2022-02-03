import React from 'react';
import { MonthSwitcher } from './MonthSwitcher';
import './MonthlyCalendar.css';

const times = new Array(24)
  .fill()
  .map((_, i) => (i === 0 ? '' : `${('00' + i).slice(-2)}:00`));

// TODO: APIから会議室のリストを取得したものを使うようにしたら削除
const dummyRooms = [
  {
    id: 0,
    name: '会議室1',
    reservations: [
      {
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
      },
    ],
  },
  {
    id: 1,
    name: '会議室2',
    reservations: [
      {
        startDateTime: '2022-01-28T12:00:00',
        endDateTime: '2022-01-28T12:30:00',
        reserverName: '泉水',
        guestName: '小田',
      },
      {
        startDateTime: '2022-01-28T12:30:00',
        endDateTime: '2022-01-28T12:45:00',
        reserverName: '塩根',
        guestName: '小田',
      },
      {
        startDateTime: '2022-01-28T13:30:00',
        endDateTime: '2022-01-28T16:45:00',
        reserverName: '塩根',
        guestName: '小田',
      },
    ],
  },
  {
    id: 2,
    name: '会議室3',
    reservations: [
      {
        startDateTime: '2022-01-28T12:30:00',
        endDateTime: '2022-01-28T12:45:00',
        reserverName: '泉水',
        guestName: '小田',
      },
      {
        startDateTime: '2022-01-28T12:45:00',
        endDateTime: '2022-01-28T13:00:00',
        reserverName: '泉水',
        guestName: '小田',
      },
    ],
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
  },
];

export const MonthlyCalendar = ({
  rooms = dummyRooms,
  selectedMonth,
  onMonthChange,
}) => {
  return (
    <div className="monthly-calendar">
      <div className="monthly-calendar--header">
        <MonthSwitcher selectedMonth={selectedMonth} onChange={onMonthChange} />
        <div className="monthly-calendar--header-room">
          <div className="monthly-calendar--time-spacer" />
          {rooms.map((room) => (
            <div className="monthly-calendar--room-label" key={room.id}>
              {room.name}
            </div>
          ))}
        </div>
      </div>
      <div className="monthly-calendar--body">
        <div className="monthly-calendar--times">
          {times.map((time) => (
            <div className="monthly-calendar--time" key={time}>
              {time}
            </div>
          ))}
        </div>
        <div className="monthly-calendar--room-columns">
          {/* {rooms.map((room) => (
            <DailyCalendarRoomColumn
              reservations={room.reservations}
              key={room.id}
            />
          ))} */}
        </div>
      </div>
    </div>
  );
};
