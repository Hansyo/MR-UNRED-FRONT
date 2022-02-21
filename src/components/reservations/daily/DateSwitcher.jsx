import { React, useEffect } from 'react';
import { getReserve } from '../../../apis/getReservation';
import { getAllRooms } from '../../../apis/rooms';

import './DateSwitcher.css';

export const DateSwitcher = ({ selectedDate, onChange, onChangeData }) => {
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
  
  const receiveReserve = async () => {
    let getReserveData;
    const startDateTime = new Date(selectedDate);
    const endDateTime = new Date(selectedDate);
    startDateTime.setHours(0, 0, 0, 0);
    endDateTime.setHours(23, 59, 59, 0);

    const rooms = await getAllRooms();
    const items = await Promise.all(rooms.map(async ({ id, name }) => {
      getReserveData = await getReserve(
        startDateTime,
        endDateTime,
        id,
      );
      
      return {
        id,
        name,
        reservations: getReserveData,
      };
    }))
    onChangeData(items);
  };

  useEffect(() => {
    receiveReserve();
  }, [selectedDate]);

  const dateString = `${selectedDate.getFullYear()}/${
    selectedDate.getMonth() + 1
  }/${selectedDate.getDate()}`;

  return (
    <div className="reservations-daily--date-switch-container">
      <div className='reservations-daily--date-switch-buttons'>
        <button
          className="reservations-daily--date-switch-button"
          onClick={onClickPrev}
        >
         前へ
        </button>
      </div>
        <div className="reservations-daily--date">{dateString}</div>
      <div className='reservations-daily--date-switch-buttons'>
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
