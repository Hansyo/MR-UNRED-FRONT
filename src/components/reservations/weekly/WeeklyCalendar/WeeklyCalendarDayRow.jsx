import { useMemo } from 'react';
import { endOfDay, format, startOfDay } from 'date-fns';
import { WeeklyCalendarReservationItem } from './WeeklyCalendarReservationItem';

export const WeeklyCalendarDayRow = ({ rooms, date }) => {
  const filteredReservationsPerRoom = useMemo(() => {
    return rooms.map((room) => {
      const reservations = [];
      for (const reservation of room.reservations) {
        const startDateTime = reservation.startDateTime;
        const endDateTime = reservation.endDateTime;

        // この行の日付が予約期間に含まれない場合はスキップ
        if (endOfDay(date) <= startDateTime) {
          continue;
        } else if (endDateTime <= startOfDay(date)) {
          continue;
        }

        const startsFromToday = startOfDay(date) <= startDateTime;
        const endsAtToday = endDateTime <= endOfDay(date);
        reservations.push({
          ...reservation,
          // 開始日の場合は開始時刻を、そうでない場合は0:00を設定
          startDateTime: startsFromToday ? startDateTime : startOfDay(date),
          // 終了日の場合は終了時刻を、そうでない場合は23:59を設定
          endDateTime: endsAtToday ? endDateTime : endOfDay(date),
        });
      }
      reservations.sort((a, b) => a.startDateTime - b.startDateTime);
      return { ...room, reservations };
    });
  }, [date, rooms]);

  return (
    <div className="weekly-calendar--day-row">
      <div className="weekly-calendar--time">{format(date, 'M/dd')}</div>
      {filteredReservationsPerRoom.map((room) => (
        <div className="weekly-calendar--cell" key={room.id}>
          {room.reservations.map((reservation, index) => (
            <WeeklyCalendarReservationItem
              id={reservation.id}
              startDateTime={reservation.startDateTime}
              endDateTime={reservation.endDateTime}
              reserverName={reservation.reserverName}
              guestName={reservation.guestName}
              key={index}
            />
          ))}
        </div>
      ))}
    </div>
  );
};
