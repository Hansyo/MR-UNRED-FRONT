import React from 'react';

const dateToHourAndMinute = (date) => {
  return `${('00' + date.getHours()).slice(-2)}:${(
    '00' + date.getMinutes()
  ).slice(-2)}`;
};

export const WeeklyCalendarReservationItem = ({
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
    <div className="weekly-calendar--reservation-item">
      {periodStr}
      {`（${guestName || reserverName}）`}
    </div>
  );
};
