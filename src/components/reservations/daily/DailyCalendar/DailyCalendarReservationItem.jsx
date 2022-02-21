import { differenceInMinutes, format } from 'date-fns';
import React from 'react';
import { Link } from 'react-router-dom';

const ROW_HEIGHT_PX = 70;

export const DailyCalendarReservationItem = ({
  startDateTime,
  endDateTime,
  guestName,
  reserverName,
  id,
}) => {
  const startDate = new Date(startDateTime);
  const endDate = new Date(endDateTime);
  const endTime = format(endDate, 'H:mm') === '00:00' ? '24:00' : format(endDate, 'H:mm');
  const periodStr = `${format(startDate, 'H:mm')} ~ ${endTime}`;
  const height = ROW_HEIGHT_PX * (differenceInMinutes(endDate, startDate) / 60);
  const topOffset = ROW_HEIGHT_PX * (startDate.getMinutes() / 60);

  return (
    <div
      className="daily-calendar--reservation-item"
      style={{ height, top: topOffset }}
    >
    <Link to={`./../${id}`} className="daily-calendar--link">
      {periodStr}
      {`（${guestName || reserverName}）`}
    </Link>  
    </div>
  );
};
