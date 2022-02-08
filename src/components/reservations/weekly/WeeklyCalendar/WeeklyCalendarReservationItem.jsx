import React from 'react';

const ROW_HEIGHT_PX = 64;

const dateToHourAndMinute = (date) => {
  return `${('00' + date.getHours()).slice(-2)}:${('00' + date.getMinutes()).slice(-2)}`;
};

export const WeeklyCalendarReservationItem = ({
  startDateDay,
  endDateDay,
  guestName,
  reserverName,
}) => {
  const startDate = new Date(startDateDay);
  const endDate = new Date(endDateDay);
  const periodStr = `${dateToHourAndMinute(startDate)} ~ ${dateToHourAndMinute(
    endDate,
  )}`;

  return (
    <div
      className="weekly-calendar--reservation-item"
    >
      {periodStr}
      {`（${guestName || reserverName}）`}
    </div>
  );
};
