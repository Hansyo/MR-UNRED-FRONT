import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDetails } from '../apis/getDetails';
import { DetailFormat } from '../components/reservations/detail/DetailFormat';
import { getRepeatReservation } from '../apis/getRepeatReservation';

const ReservationDetailPage = () => {
  const { reservationId } = useParams();
  const [detailData, setDetailData] = useState({
      start_date_time: "                ",
      end_date_time: "                ",
  });
  const [repetitionData, setRepetitionData] = useState([]);

  useEffect(() => {
    const receiveDetail = async () => {
      const detail = await getDetails(reservationId);
      setDetailData(detail);
    };
    receiveDetail();
  },[]);

  return (
    <div className="reservations-detail--page">
      <DetailFormat detailData={detailData} repetitionData={repetitionData} setRepetitionData={setRepetitionData} />
    </div>
  );
};
export default ReservationDetailPage;