import { WeeklyCalendarReservationItem } from './WeeklyCalendarReservationItem';
import { useMemo } from 'react';

export const WeeklyCalendarDayRow = ({ reservations }) => {
  const reservationsPerDay = useMemo(() => {
    const arr = new Array(7).fill().map(() => []);
    for (const reservation of reservations) {
      const startTime = new Date(reservation.startDateTime);
      arr[startTime.getDay()].push(reservation);
    }
    return arr;
  }, [reservations]);

  return (
    <div className="weekly-calendar--day-row">
      {reservationsPerDay.map((arr, i) => (
        <div className="weekly-calendar--cell" key={i}>
          {arr.map((reservation, index) => (
            <WeeklyCalendarReservationItem
              key={index}
              startDateTime={reservation.startDateTime}
              endDateTime={reservation.endDateTime}
              reserverName={reservation.reserverName}
              guestName={reservation.guestName}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
