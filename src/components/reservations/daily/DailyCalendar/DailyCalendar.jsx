import React from 'react';
import './DailyCalendar.css';

const times = new Array(24).fill().map((_, i) => `${('00' + i).slice(-2)}:00`);

// TODO: APIから会議室のリストを取得したものを使うようにする
const rooms = [
  {
    id: 0,
    name: '会議室1',
  },
  {
    id: 1,
    name: '会議室2',
  },
  {
    id: 2,
    name: '会議室3',
  },
  {
    id: 3,
    name: '会議室4',
  },
  {
    id: 4,
    name: '会議室5',
  },
  {
    id: 5,
    name: '会議室6',
  },
];

export const DailyCalendar = ({ reservations }) => {
  return (
    <div className="daily-calendar--container">
      <div className="daily-calendar--times">
        {times.map((time) => (
          <div className="daily-calendar--time" key={time}>
            {time}
          </div>
        ))}
      </div>
      <div className="daily-calendar--room-columns">
        {rooms.map((room) => (
          <div className="daily-calendar--room-column" key={room.id}>
            <div className="daily-calendar--room-label">{room.name}</div>
            {times.map((time) => (
              <div className="daily-calendar--cell" key={time}></div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
