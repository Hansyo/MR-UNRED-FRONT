import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getDetails } from '../apis/getDetails';
import { DetailFormat } from '../components/reservations/detail/DetailFormat';

const ReservationDetailPage = () => {
  const { reservationId } = useParams();
  const [detailData, setDetailData] = useState({});
  const [repetitionData, setRepetitionData] = useState([]);

  const receiveDetails = async () => {
    setDetailData(await getDetails(reservationId));
  };

  //TODO 繰り返し予約の取得
  const dumyrep = [
    {
      id: 1,
      guest_name: "TEST USER",
      start_date_time: "2022-02-02T08:00:00.000000Z",
      end_date_time: "2022-02-02T09:00:00.000000Z",
      purpose: "purpose",
      guest_detail: "User",
      room_id: 1,
      repitation_id: 1,
      created_at: "2022-02-10T07:17:06.000000Z",
      updated_at: "2022-02-10T07:17:06.000000Z"
    },
    {
      id: 2,
      guest_name: "TEST USER",
      start_date_time: "2022-02-03T08:00:00.000000Z",
      end_date_time: "2022-02-03T09:00:00.000000Z",
      purpose: "purpose",
      guest_detail: "User",
      room_id: 1,
      repitation_id: 1,
      created_at: "2022-02-10T07:17:06.000000Z",
      updated_at: "2022-02-10T07:17:06.000000Z"
    },
  ];

  const dumy = {
      id: 1,
      guest_name: "TEST USER",
      start_date_time: "2022-02-02T08:00:00.000000Z",
      end_date_time: "2022-02-02T09:00:00.000000Z",
      purpose: "purpose",
      guest_detail: "User",
      room_id: 1,
      repitation_id: 1,
      created_at: "2022-02-10T07:17:06.000000Z",
      updated_at: "2022-02-10T07:17:06.000000Z"
  };
  
  useEffect(() => {
    receiveDetails();
  }, []);
  
  return (
    <div className="reservations-detail--page">
      <DetailFormat detailData={dumy} repetitionData={dumyrep} />
    </div>
  );
};
export default ReservationDetailPage;
