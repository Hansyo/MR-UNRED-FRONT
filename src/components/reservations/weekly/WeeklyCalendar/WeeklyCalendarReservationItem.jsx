import React from 'react';
import { Link } from 'react-router-dom';

const dateToHourAndMinute = (date) => {
  return `${('00' + date.getHours()).slice(-2)}:${(
    '00' + date.getMinutes()
  ).slice(-2)}`;
};

export const WeeklyCalendarReservationItem = ({
  id,

  startDateTime,
  endDateTime,
  guestName,
  reserverName,
}) => {
  const startDate = new Date(startDateTime);
  const endDate = new Date(endDateTime);
  const periodStr = `${dateToHourAndMinute(startDate)} ~ ${dateToHourAndMinute(
    endDate,
  )}`;
  return (
    <Link
      className="weekly-calendar--reservation-item"
      to={`/reservations/${id}`}
    >
      {periodStr}
      {`（${guestName || reserverName}）`}
    </Link>
  );
};
