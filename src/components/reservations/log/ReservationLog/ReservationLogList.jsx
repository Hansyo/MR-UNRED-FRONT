import React from 'react';
import { format } from 'date-fns';
import { Link } from 'react-router-dom';

const formatDateTime = (date) => {
  return format(date, 'yyyy年M月d日 H:mm');
};

export const ReservationLogList = ({ reservations }) => {
  return (
    <ul className="reservation-log__grid">
      {reservations.map((reservation) => (
        <li key={reservation.id}>
          <Link
            className="reservation-log__item"
            to={`/reservations/${reservation.id}`}
          >
            <div className="reservation-log__item-room">
              {reservation.room.name}
            </div>
            <div className="reservation-log__item-period">
              {`${formatDateTime(reservation.startDateTime)} ~ ${formatDateTime(
                reservation.endDateTime,
              )}`}
            </div>
            <div className="reservation-log__item-detail">
              <div className="reservation-log__item-label">利用目的</div>
              <div className="reservation-log__item-data">
                {reservation.purpose}
              </div>
              <div className="reservation-log__item-detail-flex">
                <div className="reservation-log__item-detail-flex-inner">
                  <div className="reservation-log__item-label">利用者</div>
                  <div className="reservation-log__item-data">
                    {reservation.guestName}
                  </div>
                </div>
                <div className="reservation-log__item-detail-flex-inner">
                  <div className="reservation-log__item-label">予約者</div>
                  <div className="reservation-log__item-data">
                    {reservation.reserverName}
                  </div>
                </div>
              </div>
              <div className="reservation-log__item-label">利用者詳細</div>
              <div className="reservation-log__item-data">
                {reservation.guestDetail}
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
