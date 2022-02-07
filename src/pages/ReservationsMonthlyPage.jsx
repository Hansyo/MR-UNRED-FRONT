import React, { useState } from 'react';
import { MonthlyCalendar } from '../components/reservations/monthly/MonthlyCalendar';

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

const ReservationsMonthlyPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [reservations, setReservations] = useState();

  const onMonthChange = (selectedMonth) => {};

  return (
    <div className="reservations-daily--page">
      <MonthlyCalendar
        rooms={[]}
        selectedMonth={selectedMonth}
        onMonthChange={setSelectedMonth}
      />
    </div>
  );
};
export default ReservationsMonthlyPage;
