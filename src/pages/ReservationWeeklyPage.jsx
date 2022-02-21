import React, { useEffect, useState } from 'react';
import { endOfWeek, startOfWeek } from 'date-fns';
import { Header } from '../components/common/Header';
import { WeeklyCalendar } from '../components/reservations/weekly/WeeklyCalendar/WeeklyCalendar';
import { getReserve } from '../apis/getReservation';
import { getAllRooms } from '../apis/rooms';
import { Link } from 'react-router-dom';

const convertReservationResponse = (data) => ({
  id: data.id,
  startDateTime: new Date(data.start_date_time),
  endDateTime: new Date(data.end_date_time),
  guestName: data.guest_name,
  guestDetail: data.guest_detail,
  purpose: data.purpose,
  roomId: data.room.id,
});

const ReservationsWeeklyPage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [rooms, setRooms] = useState([]);

  // Fetch reservation data for the selected month
  useEffect(() => {
    (async () => {
      const dateFrom = startOfWeek(selectedDate);
      const dateTo = endOfWeek(selectedDate);
      const rooms = await getAllRooms();
      const roomsWithReservations = await Promise.all(
        rooms.map(async ({ id, name }) => {
          const reservations = (await getReserve(dateFrom, dateTo, id)).map(
            convertReservationResponse,
          );
          return {
            id,
            name,
            reservations,
          };
        }),
      );
      setRooms(roomsWithReservations);
    })();
  }, [selectedDate]);

  return (
    <div>
      <Header />
      <div className="daily-container--btn">
      <Link className="daily-transition--btn" to="/reservations/daily">
        日毎表示
        </Link>
        <button className="daily-transition--btn" onClick={() => {setSelectedDate(new Date())}}>
        本日
        </button>
        <Link className="daily-transition--btn" to="/reservations/monthly">
        月毎表示
      </Link>
      </div>
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
