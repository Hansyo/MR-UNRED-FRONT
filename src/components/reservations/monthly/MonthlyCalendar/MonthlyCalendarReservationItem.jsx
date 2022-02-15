import React from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const startDate = new Date(startDateTime);
  const endDate = new Date(endDateTime);
  const periodStr = `${dateToHourAndMinute(startDate)} ~ ${dateToHourAndMinute(
    endDate,
  )}`;

  return (
    <div className="monthly-calendar--reservation-item"
    onClick={() => navigate(`./../${id}`)}>
      {periodStr}
      {`（${guestName || reserverName}）`}
    </div>
  );
};
