import { differenceInMinutes, format } from 'date-fns';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// In react-router-dom v6 useHistory() is replaced by useNavigate().

const ROW_HEIGHT_PX = 70;

export const DailyCalendarReservationItem = ({
  startDateTime,
  endDateTime,
  guestName,
  reserverName,
  id,
}) => {
  const navigate = useNavigate();
  const startDate = new Date(startDateTime);
  const endDate = new Date(endDateTime);
  const periodStr = `${format(startDate, 'H:mm')} ~ ${format(endDate, 'H:mm')}`;
  const height = ROW_HEIGHT_PX * (differenceInMinutes(endDate, startDate) / 60);
  const topOffset = ROW_HEIGHT_PX * (startDate.getMinutes() / 60);

  return (
    <div
      className="daily-calendar--reservation-item"
      style={{ height, top: topOffset }}
      onClick={() => navigate(`./../${id}`)}
    >
      {periodStr}
      {`（${guestName || reserverName}）`}
    </div>
  );
};
