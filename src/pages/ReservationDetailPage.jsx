import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetails } from '../apis/getDetails';
import { DetailFormat } from '../components/reservations/detail/DetailFormat';
import { format } from 'date-fns';
import { Header } from '../components/common/Header/Header';

const ReservationDetailPage = () => {
  const { reservationId } = useParams();
  const [detailData, setDetailData] = useState([]);
  const [repetitionData, setRepetitionData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const receiveDetail = async () => {
        const detail = await getDetails(reservationId);
        const arrangeDetail = {
          id: detail.id,
          startDateTime: format(new Date(detail.start_date_time), 'yyyy-MM-dd HH:mm'),
          endDateTime: format(new Date(detail.end_date_time),'yyyy-MM-dd HH:mm'),
          reserverName: detail.reserver_name,
          guestName: detail.guest_name,
          guestDetail: detail.guest_detail,
          purpose: detail.purpose,
          roomName: detail.room.name,
          repitationId: detail.repitation_id,
        };
        setDetailData(arrangeDetail);
    };
    receiveDetail();
  },[]);

  return (
    <div>
      <Header />
      <div className="reservations-detail--page">
        <a class="reservations-detail--back" href="#"
          onClick={() => { navigate(-1); return false; }}>戻る</a>
        <DetailFormat detailData={detailData} repetitionData={repetitionData} setRepetitionData={setRepetitionData} />
      </div>
    </div> 
  );
};
export default ReservationDetailPage;