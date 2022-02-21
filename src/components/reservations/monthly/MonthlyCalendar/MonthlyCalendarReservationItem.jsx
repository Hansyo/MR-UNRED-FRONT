import React from 'react';
import { Link } from 'react-router-dom';

const dateToHourAndMinute = (date) => {
  return `${('00' + date.getHours()).slice(-2)}:${(
    '00' + date.getMinutes()
  ).slice(-2)}`;
};

export const MonthlyCalendarReservationItem = ({
  startDateTime,
  endDateTime,
  guestName,
  reserverName,
  id,
}) => {
  const startDate = new Date(startDateTime);
  const endDate = new Date(endDateTime) === '00:00' ? '24:00': new Date(endDateTime);
  const periodStr = `${dateToHourAndMinute(startDate)} ~ ${dateToHourAndMinute(
    endDate,
  )}`;

  return (
    <div className="monthly-calendar--reservation-item">
      <Link to={`./../${id}`} className="monthly-calendar--link">
      {periodStr}
        {`（${guestName || reserverName}）`}
    </Link>
    </div>
  );
};
