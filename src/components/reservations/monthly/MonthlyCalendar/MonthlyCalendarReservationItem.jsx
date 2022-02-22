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
  const startDate = dateToHourAndMinute(new Date(startDateTime));
  const endDate =
    dateToHourAndMinute(new Date(endDateTime)) === '00:00' ? '24:00' : dateToHourAndMinute(new Date(endDateTime));
  const periodStr = `${startDate} ~ ${endDate}`;

  return (
    <Link
      className="monthly-calendar--reservation-item"
      to={`./../${id}`}>
      {periodStr}
        {`（${guestName || reserverName}）`}
    </Link>
  );
};
