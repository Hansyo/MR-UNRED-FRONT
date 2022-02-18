import { endOfMonth, startOfMonth } from 'date-fns';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { getReserve } from '../apis/getReservation';
import { Header } from '../components/common/Header/Header';
import { MonthlyCalendar } from '../components/reservations/monthly/MonthlyCalendar';

const emptyRooms = [
  {
    id: 1,
    name: '会議室1',
    reservations: [],
  },
  {
    id: 2,
    name: '会議室2',
    reservations: [],
  },
  {
    id: 3,
    name: '会議室3',
    reservations: [],
  },
  {
    id: 4,
    name: '会議室4',
    reservations: [],
  },
  {
    id: 5,
    name: '会議室5',
    reservations: [],
  },
  {
    id: 6,
    name: '会議室6',
    reservations: [],
  },
];

const ReservationsMonthlyPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [rooms, setRooms] = useState(emptyRooms);

  // Fetch reservation data for the selected month
  useEffect(() => {
    (async () => {
      const dateFrom = startOfMonth(selectedMonth);
      const dateTo = endOfMonth(selectedMonth);
      const rawReservations = await getReserve(dateFrom, dateTo);
      const reservations = rawReservations.map((reservation) => ({
        id: reservation.id,
        startDateTime: new Date(reservation.start_date_time),
        endDateTime: new Date(reservation.end_date_time),
        guestName: reservation.guest_name,
        guestDetail: reservation.guest_detail,
        purpose: reservation.purpose,
        roomId: reservation.room.id,
      }));
      const rooms = JSON.parse(JSON.stringify(emptyRooms));
      for (const reservation of reservations) {
        rooms[reservation.roomId - 1].reservations.push(reservation);
      }
      setRooms(rooms);
    })();
  }, [selectedMonth]);

  return (
    <div>
      <Header />
      <div className="reservations-daily--page">
        <MonthlyCalendar
          rooms={rooms}
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
      </div>
    </div>
  );
};
export default ReservationsMonthlyPage;
