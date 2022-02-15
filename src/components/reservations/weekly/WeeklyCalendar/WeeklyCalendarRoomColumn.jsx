import { WeeklyCalendarReservationItem } from './WeeklyCalendarReservationItem';
import { useMemo } from 'react';

export const WeeklyCalendarRoomColumn = ({ reservations }) => {
  const reservationsPerDay = useMemo(() => {
    const arr = new Array(7).fill().map([]);
    for (const reservation of reservations) {
      const startTime = new Date(reservation.startDateTime);
      arr[startTime.getDay()].push(reservation);
    }
    return arr;
  }, [reservations]);

  return (
    <div className="weekly-calendar--room-column">
      {reservationsPerDay.map((arr, i) => (
        <div className="weekly-calendar--cell" key={i}>
          {arr.map((reservation) => (
            <WeeklyCalendarReservationItem
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
