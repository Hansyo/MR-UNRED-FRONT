import React, { useMemo, useState } from 'react';
import { MonthSwitcher } from './MonthSwitcher';
import './MonthlyCalendar.css';
import { MonthlyCalendarReservationItem } from './MonthlyCalendarReservationItem';
import { differenceInHours, endOfDay, startOfDay } from 'date-fns';
import { addDays } from 'date-fns/esm';
import { useEffect } from 'react';

const days = [
  {
    value: 0,
    shortText: '日',
  },
  {
    value: 1,
    shortText: '月',
  },
  {
    value: 2,
    shortText: '火',
  },
  {
    value: 3,
    shortText: '水',
  },
  {
    value: 4,
    shortText: '木',
  },
  {
    value: 5,
    shortText: '金',
  },
  {
    value: 6,
    shortText: '土',
  },
];

const getMonthDateCount = (month) => {
  const date = new Date(month);
  date.setDate(1);
  date.setMonth(month.getMonth() + 1);
  date.setDate(0);
  return date.getDate();
};

export const MonthlyCalendar = ({ rooms, selectedMonth, onMonthChange }) => {
  const [selectedRoomIdx, setSelectedRoomIdx] = useState();

  // 部屋情報が読み込まれ次第、最初の会議室を選択する
  useEffect(() => {
    if (selectedRoomIdx == null && rooms.length > 0) {
      setSelectedRoomIdx(0);
    }
  }, [rooms.length, selectedRoomIdx]);

  const dates = useMemo(() => {
    if (selectedRoomIdx == null) {
      return [];
    }

    const monthDateCount = getMonthDateCount(selectedMonth);
    const arr = new Array(monthDateCount).fill().map((_, idx) => ({
      value: idx + 1,
      text: `${idx + 1}`,
      reservations: [],
    }));

    // 予定を追加
    for (const reservation of rooms[selectedRoomIdx].reservations) {
      const startDateTime = reservation.startDateTime;
      const endDateTime = reservation.endDateTime;

      // 複数日に渡る予定は一日単位に分割する
      // 開始日と終了日はそれぞれ始端/終端時刻を維持し、中間日は0:00~23:59とする
      const durationInDays = Math.ceil(
        differenceInHours(endDateTime, startDateTime) / 24,
      );
      for (let i = 0; i < durationInDays; i++) {
        const date = addDays(startDateTime, i);

        // 前月、翌月に続く予定は、今月分のみ表示する
        if (date.getMonth() !== selectedMonth.getMonth()) {
          continue;
        }

        const startsFromToday = i === 0;
        const endsAtToday = i === durationInDays - 1;
        arr[date.getDate() - 1].reservations.push({
          ...reservation,
          // 開始日の場合は開始時刻を、そうでない場合は0:00を設定
          startDateTime: startsFromToday ? startDateTime : startOfDay(date),
          // 終了日の場合は終了時刻を、そうでない場合は23:59を設定
          endDateTime: endsAtToday ? endDateTime : endOfDay(date),
        });
      }
    }

    // カレンダー左上の、月が始まる位置合わせを追加
    const firstDate = new Date(selectedMonth);
    firstDate.setDate(1);
    const firstSpacerNum = firstDate.getDay();
    arr.unshift(
      ...new Array(firstSpacerNum).fill().map((_, idx) => ({
        value: -(firstSpacerNum - idx),
        text: '',
        reservations: [],
      })),
    );

    // カレンダー右下の、次の月の位置合わせを追加
    const lastDate = new Date(selectedMonth);
    lastDate.setDate(monthDateCount);
    const lastSpacerNum = 6 - lastDate.getDay();
    arr.push(
      ...new Array(lastSpacerNum).fill().map((_, idx) => ({
        value: monthDateCount + idx + 1,
        text: '',
        reservations: [],
      })),
    );

    // 各日付の中で、予約を時刻順にソート
    arr.forEach((date) => {
      date.reservations.sort((a, b) => a.startDateTime - b.startDateTime);
    });

    return arr;
  }, [rooms, selectedMonth, selectedRoomIdx]);

  return (
    <div className="monthly-calendar">
      <div className="monthly-calendar--header">
        <div className="monthly-calendar--header-room-month">
          <select
            className="monthly-calendar--header-room"
            value={selectedRoomIdx}
            onChange={(e) => setSelectedRoomIdx(e.target.value)}
          >
            {rooms.map(({ id, name }, idx) => (
              <option value={idx} key={id}>
                {name}
              </option>
            ))}
          </select>
          <MonthSwitcher
            selectedMonth={selectedMonth}
            onChange={onMonthChange}
          />
        </div>
        <div className="monthly-calendar--header-day">
          {days.map((day) => (
            <div
              className={`monthly-calendar--day-label ${
                day.value === 0 ? 'monthly-calendar--day-label__sunday' : ''
              }`}
              key={day.value}
            >
              {day.shortText}
            </div>
          ))}
        </div>
      </div>
      <div className="monthly-calendar--body">
        {dates.map((date) => (
          <div className="monthly-calendar--cell" key={date.value}>
            <div className="monthly-calendar--cell-date">{date.text}</div>
            {date.reservations.map((reservation) => (
              <MonthlyCalendarReservationItem
                startDateTime={reservation.startDateTime}
                endDateTime={reservation.endDateTime}
                reserverName={reservation.reserverName}
                guestName={reservation.guestName}
                id={reservation.id}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
