import React, { useMemo } from 'react';
import './WeeklyCalendar.css';
import { addDays, startOfWeek } from 'date-fns';
import { WeeklyCalendarDayRow } from './WeeklyCalendarDayRow';
import { DateSwitcher } from '../DateSwitcher';

export const WeeklyCalendar = ({ rooms, selectedDate, onDateChange }) => {
  const dates = useMemo(() => {
    const arr = [];
    const weekStartDate = startOfWeek(selectedDate);
    for (let i = 0; i < 7; i++) {
      arr.push(addDays(weekStartDate, i));
    }
    return arr;
  }, [selectedDate]);

  return (
    <div className="weekly-calendar">
      <div className="weekly-calendar--header">
        <DateSwitcher selectedDate={selectedDate} onChange={onDateChange} />
        <div className="weekly-calendar--header-room">
          <div className="weekly-calendar--time-spacer" />
          {rooms.map((room) => (
            <div className="weekly-calendar--room-label" key={room.id}>
              {room.name}
            </div>
          ))}
        </div>
      </div>
      <div className="weekly-calendar--body">
        <div className="weekly-calendar--day-rows">
          {dates.map((date) => (
            <WeeklyCalendarDayRow
              rooms={rooms}
              date={date}
              key={date.toISOString()}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
