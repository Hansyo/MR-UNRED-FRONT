import React from 'react';
import './DailyCalendar.css';
import { DailyCalendarRoomColumn } from './DailyCalendarRoomColumn';
import { DateSwitcher } from '../DateSwitcher';

const times = new Array(24)
  .fill()
  .map((_, i) => (i === 0 ? '' : `${('00' + i).slice(-2)}:00`));

export const DailyCalendar = ({ reservations, selectedDate, onDateChange, onChangeData }) => {
  return (
    <div className="daily-calendar">
      <div className="daily-calendar--header">
        <DateSwitcher selectedDate={selectedDate} onChange={onDateChange} onChangeData={onChangeData} />
        <div className='daily-calendar--header-room'>
          <div className="daily-calendar--time-spacer" />
          {reservations.map((room) => (
            <div className="daily-calendar--room-label"key={room.id}>
              {room.name}
            </div>
          ))}
        </div>
      </div>
      <div className="daily-calendar--body">
        <div className="daily-calendar--times">
          {times.map((time) => (
            <div className="daily-calendar--time" key={time}>
              {time}
            </div>
          ))}
        </div>
        <div className="daily-calendar--room-columns">
          {reservations.map((room) => (
            <DailyCalendarRoomColumn
              reservations={room.reservations}
              key={room.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
