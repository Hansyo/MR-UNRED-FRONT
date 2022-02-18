import React, { useMemo } from 'react';
import { format, startOfDay } from 'date-fns';
import { ReservationLogList } from './ReservationLogList';
import './ReservationLog.css';

export const ReservationLog = ({ reservations }) => {
  // 日付毎に振り分けた予約リスト
  // 日付は昇順、その中の予約は降順でソートされている
  const reservationsPerDay = useMemo(() => {
    const map = new Map();

    for (const reservation of reservations) {
      const startDateEpoch = startOfDay(reservation.startDateTime).getTime();

      if (!map.has(startDateEpoch)) {
        map.set(startDateEpoch, []);
      }
      map.get(startDateEpoch).push(reservation);
    }

    const arr = [];
    map.forEach((reservations, epoch) => {
      arr.push({
        epoch,
        dateStr: format(new Date(epoch), 'yyyy年M月d日'),
        reservations: reservations.sort(
          (a, b) => a.startDateTime - b.startDateTime,
        ),
      });
    });
    arr.sort((a, b) => b.epoch - a.epoch);

    return arr;
  }, [reservations]);

  return (
    <div className="reservation-log__page">
      {reservationsPerDay.map(({ epoch, dateStr, reservations }) => (
        <div className="reservation-log__date-section" key={epoch}>
          <h2 className="reservation-log__date-title">{dateStr}</h2>
          <ReservationLogList reservations={reservations} />
        </div>
      ))}
    </div>
  );
};
