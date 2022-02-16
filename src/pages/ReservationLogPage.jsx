import React, { useState, useEffect } from 'react';
import { getAllReservations } from '../apis/getReservation';
import { Header } from '../components/common/Header/Header';
import { ReservationLog } from '../components/reservations/log/ReservationLog/ReservationLog';

const ReservationLogPage = () => {
  const [reservations, setReservations] = useState([]);

  // Fetch reservation data for the selected month
  useEffect(() => {
    (async () => {
      const rawReservations = await getAllReservations();
      const reservations = rawReservations.map((reservation) => ({
        id: reservation.id,
        startDateTime: new Date(reservation.start_date_time),
        endDateTime: new Date(reservation.end_date_time),
        reserverName: reservation.reserver_name,
        guestName: reservation.guest_name,
        guestDetail: reservation.guest_detail,
        purpose: reservation.purpose,
        roomId: reservation.room_id,
      }));
      setReservations(reservations);
    })();
  }, []);

  return (
    <div>
      <Header />
      <ReservationLog reservations={reservations} />
    </div>
  );
};
export default ReservationLogPage;
