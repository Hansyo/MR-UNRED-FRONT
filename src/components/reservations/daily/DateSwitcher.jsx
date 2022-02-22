import { React, useCallback, useEffect, useRef } from 'react';
import { getReserve } from '../../../apis/getReservation';
import { getAllRooms } from '../../../apis/rooms';

import './DateSwitcher.css';

export const DateSwitcher = ({ selectedDate, onChange, onChangeData }) => {
  const cachedRooms = useRef();
  const days = ["日", "月", "火", "水", "木", "金", "土"];
  
  const onClickPrev = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setDate(prevDate.getDate() - 1);
    onChange(prevDate);
  };

  const onClickNext = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setDate(nextDate.getDate() + 1);
    onChange(nextDate);
  };

  const receiveReserve = useCallback(async () => {
    if (cachedRooms.current) {
      onChangeData(
        cachedRooms.current.map(({ id, name }) => ({
          id,
          name,
          reservations: [],
        })),
      );
    }

    let getReserveData;
    const startDateTime = new Date(selectedDate);
    const endDateTime = new Date(selectedDate);
    startDateTime.setHours(0, 0, 0, 0);
    endDateTime.setHours(23, 59, 59, 0);

    const rooms =
      cachedRooms.current ||
      (await getAllRooms().then((rooms) => (cachedRooms.current = rooms)));
    const allReserves = (await getReserve(startDateTime, endDateTime, null));
    const items = rooms.map(({ id, name }) => {
      return {
        id,
        name,
        reservations: allReserves.filter((reserve) => reserve.room.id === id),
      };
    });
    onChangeData(items);
  }, [onChangeData, selectedDate]);

  useEffect(() => {
    receiveReserve();
  }, [receiveReserve, selectedDate]);

  const dateString = `${selectedDate.getFullYear()}/${
    selectedDate.getMonth() + 1
  }/${selectedDate.getDate()} (${days[selectedDate.getDay()]})`;

  return (
    <div className="reservations-daily--date-switch-container">
      <div className="reservations-daily--date-switch-buttons">
        <button
          className="reservations-daily--date-switch-button"
          onClick={onClickPrev}
        >
          前へ
        </button>
      </div>
      <div className="reservations-daily--date">{dateString}</div>
      <div className="reservations-daily--date-switch-buttons">
        <button
          className="reservations-daily--date-switch-button"
          onClick={onClickNext}
        >
          次へ
        </button>
      </div>
    </div>
  );
};
