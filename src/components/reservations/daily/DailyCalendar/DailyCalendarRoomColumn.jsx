import { isEqual, startOfDay } from 'date-fns';
import { endOfDay } from 'date-fns/esm';
import React, { useMemo } from 'react';
import { DailyCalendarReservationItem } from './DailyCalendarReservationItem';

export const DailyCalendarRoomColumn = ({ reservations, selectedDate }) => {
  const reservationsPerHour = useMemo(() => {
    const arr = new Array(24).fill().map((_, i) => []);
    for (const reservation of reservations) {
      const startDateTime = new Date(reservation.start_date_time);
      const endDateTime = new Date(reservation.end_date_time);

      // 複数日に渡る予定から、表示する日付分のみを切り取る
      const startsFromToday = isEqual(
        startOfDay(startDateTime),
        startOfDay(selectedDate),
      );
      const endsAtToday = isEqual(
        startOfDay(endDateTime),
        startOfDay(selectedDate),
      );
      if (startsFromToday && endsAtToday) {
        arr[startDateTime.getHours()].push(reservation);
      } else if (startsFromToday && !endsAtToday) {
        // 翌日以降の予約時間を削る
        arr[startDateTime.getHours()].push({
          ...reservation,
          end_date_time: endOfDay(selectedDate),
        });
      } else if (!startsFromToday && endsAtToday) {
        // 前日以前の予約時間を削る
        arr[0].push({
          ...reservation,
          start_date_time: startOfDay(selectedDate),
        });
      } else {
        // 前日以前、翌日以降の予約時間を削る
        arr[0].push({
          ...reservation,
          start_date_time: startOfDay(selectedDate),
          end_date_time: endOfDay(selectedDate),
        });
      }
    }
    return arr;
  }, [reservations, selectedDate]);

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
              id={reservation.id}
              key={reservation.id}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
