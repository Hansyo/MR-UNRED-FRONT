import React from 'react';
import { useParams } from 'react-router-dom';

const ReservationDetailPage = () => {
  const { reservationId } = useParams();

  return <div className="reservations-daily--page">{reservationId}</div>;
};
export default ReservationDetailPage;
