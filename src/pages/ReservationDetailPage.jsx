import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getDetails } from '../apis/getDetails';
import { DetailFormat } from '../components/reservations/detail/DetailFormat';
import { format } from 'date-fns';
import { Header } from '../components/common/Header/Header';
import { getRepeatReservation } from '../apis/getRepeatReservation';

const ReservationDetailPage = () => {
  const { reservationId } = useParams();
  const [detailData, setDetailData] = useState({ id: -1 });
  const [repetitionData, setRepetitionData] = useState([{}]);
  const navigate = useNavigate();
  const ref = useRef(true);
  useEffect(() => {
    const receiveDetail = async () => {
      const detail = await getDetails(reservationId);
      const arrangeDetail = {
        id: detail.id,
        startDateTime: format(new Date(detail.start_date_time), 'yyyy-MM-dd HH:mm'),
        endDateTime: format(new Date(detail.end_date_time), 'yyyy-MM-dd HH:mm'),
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
  }, [reservationId]);

  useEffect(() => {
    const receiveRepeatDetail = async () => {
        const rawRepDetails = await getRepeatReservation(detailData.repitationId);
        const repDetails = rawRepDetails.map((repDetail) => ({
            id: repDetail.id,
            startDateTime: format(new Date(repDetail.start_date_time), 'yyyy-MM-dd HH:mm'),
            endDateTime: format(new Date(repDetail.end_date_time), 'yyyy-MM-dd HH:mm'),
        }));
        setRepetitionData(repDetails);
    };
    if (ref.current) {
        ref.current = false;
        return;
    }
    receiveRepeatDetail();
  }, [detailData]);
  
  return (
    <div>
      <Header />
      <div className="reservations-detail--page">
        <a className="reservations-detail--back" href="#"
          onClick={() => { navigate(-1); return false; }}>戻る</a>
        <DetailFormat detailData={detailData} repetitionData={repetitionData} />
      </div>
    </div>
  );
};
export default ReservationDetailPage;