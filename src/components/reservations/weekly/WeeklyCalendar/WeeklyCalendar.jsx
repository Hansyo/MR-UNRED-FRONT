import React from 'react';
import './WeeklyCalendar.css';
import { addDays, format, startOfWeek } from 'date-fns';
import { WeeklyCalendarDayRow } from './WeeklyCalendarDayRow';
import { DateSwitcher } from '../DateSwitcher';

export const WeeklyCalendar = ({ rooms, selectedDate, onDateChange }) => {
  
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
        <div className="weekly-calendar--day-rows">
          {rooms.map((room) => (
            <WeeklyCalendarDayRow
              reservations={room.reservations}
              key={room.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
