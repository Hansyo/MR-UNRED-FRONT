import { endOfMonth, startOfMonth } from 'date-fns';
import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getReserve } from '../apis/getReservation';
import { getAllRooms } from '../apis/rooms';
import { Header } from '../components/common/Header/Header';
import { MonthlyCalendar } from '../components/reservations/monthly/MonthlyCalendar';

const convertReservationResponse = (data) => ({
  id: data.id,
  startDateTime: new Date(data.start_date_time),
  endDateTime: new Date(data.end_date_time),
  guestName: data.guest_name,
  guestDetail: data.guest_detail,
  purpose: data.purpose,
  roomId: data.room.id,
});

const ReservationsMonthlyPage = () => {
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [reservations, setReservations] = useState([]);
  const cachedRooms = useRef();

  // Fetch reservation data for the selected month
  useEffect(() => {
    (async () => {
      if (cachedRooms.current) {
        setReservations(
          cachedRooms.current.map(({ id, name }) => ({
            id,
            name,
            reservations: [],
          })),
        );
      }

      const dateFrom = startOfMonth(selectedMonth);
      const dateTo = endOfMonth(selectedMonth);
      const rooms =
        cachedRooms.current ||
        (await getAllRooms().then((rooms) => (cachedRooms.current = rooms)));
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
      setReservations(roomsWithReservations);
    })();
  }, [cachedRooms, selectedMonth]);

  return (
    <div>
      <Header />
      <div className="daily-container--btn">
        <Link className="daily-transition--btn" to="/reservations/daily">
          日毎表示
        </Link>
        <button
          className="daily-transition--btn"
          onClick={() => {
            setSelectedMonth(new Date());
          }}
        >
          本日
        </button>
        <Link className="daily-transition--btn" to="/reservations/weekly">
          週毎表示
        </Link>
      </div>
      <div className="reservations-daily--page">
        <MonthlyCalendar
          rooms={reservations}
          selectedMonth={selectedMonth}
          onMonthChange={setSelectedMonth}
        />
      </div>
    </div>
  );
};
export default ReservationsMonthlyPage;
