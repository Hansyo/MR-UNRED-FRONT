import React, { useMemo } from 'react';
import { DailyCalendarReservationItem } from './DailyCalendarReservationItem';

export const DailyCalendarRoomColumn = ({ reservations }) => {
  const reservationsPerHour = useMemo(() => {
    const arr = new Array(24).fill().map((_, i) => []);
    for (const reservation of reservations) {
      const startTime = new Date(reservation.start_date_time);
      arr[startTime.getHours()].push(reservation);
    }
    return arr;
  }, [reservations]);

  return (
    <div className="daily-calendar--room-column">
      {reservationsPerHour.map((arr, i) => (
        <div className="daily-calendar--cell" key={i}>
          {arr.map((reservation) => (
            <DailyCalendarReservationItem
              startDateTime={reservation.start_date_time}
              endDateTime={reservation.end_date_time}
              reserverName={reservation.reserver_name}
              guestName={reservation.guest_name}
              id = {reservation.id}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
