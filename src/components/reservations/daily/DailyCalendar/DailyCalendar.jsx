import React from 'react';
import './DailyCalendar.css';
import { DailyCalendarRoomColumn } from './DailyCalendarRoomColumn';

const times = new Array(24)
  .fill()
  .map((_, i) => (i === 0 ? '' : `${('00' + i).slice(-2)}:00`));

  
// TODO: APIから会議室のリストを取得したものを使うようにしたら削除
export const DailyCalendar = ({ reservations }) => {
  return (
    <div className="daily-calendar">
      <div className="daily-calendar--header">
        <div className="daily-calendar--time-spacer" />
        {reservations.map((room) => (
          <div className="daily-calendar--room-label" key={room.id}>
            {room.name}
          </div>
        ))}
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
