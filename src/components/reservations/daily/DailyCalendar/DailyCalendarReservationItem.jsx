import React from 'react';

const ROW_HEIGHT_PX = 64;

const dateToHourAndMinute = (date) => {
  return `${('00' + date.getHours()).slice(-2)}:${(
    '00' + date.getMinutes()
  ).slice(-2)}`;
};

export const DailyCalendarReservationItem = ({
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
  const durationHours = (endDate - startDate) / 1000 / 60 / 60;
  const height = ROW_HEIGHT_PX * durationHours;
  const topOffset = (ROW_HEIGHT_PX * startDate.getMinutes()) / 60;

  return (
    <div
      className="daily-calendar--reservation-item"
      style={{ height, top: topOffset }}
    >
      {periodStr}
      {`（${guestName || reserverName}）`}
    </div>
  );
};
