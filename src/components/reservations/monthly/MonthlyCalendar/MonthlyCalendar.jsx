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
  const [selectedRoom, setSelectedRoom] = useState(rooms[0].id);

  const dates = useMemo(() => {
    const monthDateCount = getMonthDateCount(selectedMonth);
    const arr = new Array(monthDateCount).fill().map((_, idx) => ({
      value: idx + 1,
      text: `${idx + 1}`,
      reservations: [],
    }));

    // 予定を追加
    for (const reservation of rooms[selectedRoom].reservations) {
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
  }, [rooms, selectedMonth, selectedRoom]);

  return (
    <div className="monthly-calendar">
      <div className="monthly-calendar--header">
        <div className="monthly-calendar--header-room-month">
          <select
            className="monthly-calendar--header-room"
            value={selectedRoom}
            onChange={(e) => setSelectedRoom(e.target.value)}
          >
            {rooms.map(({ id, name }) => (
              <option value={id}>{name}</option>
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
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
