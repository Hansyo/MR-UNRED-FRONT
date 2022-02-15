import React, { useMemo, useState } from 'react';
import { MonthSwitcher } from './MonthSwitcher';
import './MonthlyCalendar.css';
import { MonthlyCalendarReservationItem } from './MonthlyCalendarReservationItem';

const days = [
  {
    value: 0,
    shortText: '日',
  },
  {
    value: 1,
    shortText: '月',
  },
  {
    value: 2,
    shortText: '火',
  },
  {
    value: 3,
    shortText: '水',
  },
  {
    value: 4,
    shortText: '木',
  },
  {
    value: 5,
    shortText: '金',
  },
  {
    value: 6,
    shortText: '土',
  },
];

const getMonthDateCount = (month) => {
  const date = new Date(month);
  date.setDate(1);
  date.setMonth(month.getMonth() + 1);
  date.setDate(0);
  return date.getDate();
};

export const MonthlyCalendar = ({ rooms, selectedMonth, onMonthChange }) => {
  const [selectedRoomIdx, setSelectedRoomIdx] = useState(0);

  const dates = useMemo(() => {
    const monthDateCount = getMonthDateCount(selectedMonth);
    const arr = new Array(monthDateCount).fill().map((_, idx) => ({
      value: idx + 1,
      text: `${idx + 1}`,
      reservations: [],
    }));

    // 予定を追加
    for (const reservation of rooms[selectedRoomIdx].reservations) {
      const date = new Date(reservation.startDateTime);
      arr[date.getDate() - 1].reservations.push(reservation);
    }

    // カレンダー左上の、月が始まる位置合わせを追加
    const firstDate = new Date(selectedMonth);
    firstDate.setDate(1);
    const firstSpacerNum = firstDate.getDay();
    arr.unshift(
      ...new Array(firstSpacerNum).fill().map((_, idx) => ({
        value: -(firstSpacerNum - idx),
        text: '',
        reservations: [],
      })),
    );

    // カレンダー右下の、次の月の位置合わせを追加
    const lastDate = new Date(selectedMonth);
    lastDate.setDate(monthDateCount);
    const lastSpacerNum = 6 - lastDate.getDay();
    arr.push(
      ...new Array(lastSpacerNum).fill().map((_, idx) => ({
        value: monthDateCount + idx + 1,
        text: '',
        reservations: [],
      })),
    );

    return arr;
  }, [rooms, selectedMonth, selectedRoomIdx]);

  return (
    <div className="monthly-calendar">
      <div className="monthly-calendar--header">
        <div className="monthly-calendar--header-room-month">
          <select
            className="monthly-calendar--header-room"
            value={selectedRoomIdx}
            onChange={(e) => setSelectedRoomIdx(e.target.value)}
          >
            {rooms.map(({ name }, idx) => (
              <option value={idx}>{name}</option>
            ))}
          </select>
          <MonthSwitcher
            selectedMonth={selectedMonth}
            onChange={onMonthChange}
          />
        </div>
        <div className="monthly-calendar--header-day">
          {days.map((day) => (
            <div
              className={`monthly-calendar--day-label ${
                day.value === 0 ? 'monthly-calendar--day-label__sunday' : ''
              }`}
              key={day.value}
            >
              {day.shortText}
            </div>
          ))}
        </div>
      </div>
      <div className="monthly-calendar--body">
        {dates.map((date) => (
          <div className="monthly-calendar--cell" key={date.value}>
            <div className="monthly-calendar--cell-date">{date.text}</div>
            {date.reservations.map((reservation) => (
              <MonthlyCalendarReservationItem
                startDateTime={reservation.startDateTime}
                endDateTime={reservation.endDateTime}
                reserverName={reservation.reserverName}
                guestName={reservation.guestName}
                id={reservation.id}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
