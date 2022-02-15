import React, { useEffect, useState } from 'react';
import { endOfWeek, startOfWeek } from 'date-fns';
import { Header } from '../components/common/Header';
import { WeeklyCalendar } from '../components/reservations/weekly/WeeklyCalendar/WeeklyCalendar';
import { getReserve } from '../apis/getReservation';

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

const ReservationsWeeklyPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rooms, setRooms] = useState(emptyRooms);

  // Fetch reservation data for the selected month
  useEffect(() => {
    (async () => {
      const dateFrom = startOfWeek(selectedDate);
      const dateTo = endOfWeek(selectedDate);
      const rawReservations = await getReserve(dateFrom, dateTo);
      const reservations = rawReservations.map((reservation) => ({
        id: reservation.id,
        startDateTime: new Date(reservation.start_date_time),
        endDateTime: new Date(reservation.end_date_time),
        guestName: reservation.guest_name,
        guestDetail: reservation.guest_detail,
        purpose: reservation.purpose,
        roomId: reservation.room_id,
      }));
      const rooms = JSON.parse(JSON.stringify(emptyRooms));
      for (const reservation of reservations) {
        rooms[reservation.roomId - 1].reservations.push(reservation);
      }
      setRooms(rooms);
    })();
  }, [selectedDate]);

  return (
    <div>
      <Header />
      <div className="reservations-weekly--page">
        <WeeklyCalendar
          rooms={rooms}
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      </div>
    </div>
  );
};
export default ReservationsWeeklyPage;
