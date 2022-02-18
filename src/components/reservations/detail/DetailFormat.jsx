import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteReserve } from '../../../apis/delete';
import { getRepeatReservation } from '../../../apis/getRepeatReservation';
import { format } from 'date-fns';
import './DetailFormat.css';

export const DetailFormat = ({ detailData, repetitionData, setRepetitionData }) => {
    const navigate = useNavigate();
    const currentDate = new Date();

    useEffect(() => {
        const receiveRepeatDetail = async () => {
            try {
                const rawRepDetails = await getRepeatReservation(detailData.repitationId);
                const repDetails = rawRepDetails.map((repDetail) => ({
                    id: repDetail.id,
                    startDateTime: format(new Date(repDetail.start_date_time), 'yyyy-MM-dd HH:mm'),
                    endDateTime: format(new Date(repDetail.end_date_time), 'yyyy-MM-dd HH:mm'),
                }));
                setRepetitionData(repDetails);  
            } catch (err) {
            }
        };
        receiveRepeatDetail();
    },[detailData]);
    
    const deleteSingleReservations = async () => {
        if (window.confirm("この予約を削除してもよろしいですか？")) {
            try {
                await deleteReserve(detailData.id);
                alert('削除しました');
                navigate(`./../monthly`);
              } catch (err) {
                alert(`保存に失敗しました：${err.message}`);
              }
        }
    };

    const deleteRepeatReservations = async () => {
        /*　未実装　繰り返し予約の削除ができてから*/
        if (window.confirm("すべての予約削除してもよろしいですか？")) {
            console.log("すべてdeleteするよ");
            alert('削除しました');
            navigate(`./../monthly`);
        }
    };

    const viewSingleDate = () => {
        if (detailData.startDateTime) {
            const listItems = [
                <div className="reservations-detail--data">
                    {`${detailData.startDateTime} - ${detailData.endDateTime}`}
                </div>
            ];

            
            if (new Date(detailData.startDateTime) > currentDate.getTime()) {
                listItems.push(
                    <div>
                        <button className="reservations-detail--button"
                            onClick={deleteSingleReservations}>削除</button>
                    </div>
                );
            }
            return listItems;
        }
    };

    const viewRepeatDate = () => {
        const listItems = [
            <div className="reservations-detail--data">
                {repetitionData.map((data) => {
                    if (new Date(data.startDateTime) > currentDate.getTime()) {
                        return (
                            <div key={data.id}>
                                {`${data.startDateTime} - ${data.endDateTime}`}
                            </div>
                        );
                    }
                })}
            </div>
        ];
        
        if (repetitionData.length) { 
            if (new Date(repetitionData.slice(-1)[0].startDateTime) > currentDate.getTime()) {
                listItems.push(
                    <div>
                        <button className="reservations-detail--button"
                            onClick={deleteRepeatReservations}>すべて削除</button>
                    </div>
                );
            }
        }
        return listItems;
    };

    return (
        <div className="reservations-detail--grid">
            <div className="reservations-detail--container">
                <div className="reservations-detail--label">会議室名</div>
                <div className="reservations-detail--data">{detailData.roomName}</div>
            </div>
            <div className="reservations-detail--container">
                <div className="reservations-detail--label">日時</div>
                {viewSingleDate()}
            </div>
            <div className="reservations-detail--container">
                <div className="reservations-detail--label">繰り返し一覧</div>
                {viewRepeatDate()}
            </div>
            <div className="reservations-detail--container">
                <div className="reservations-detail--label">予約者</div>
                <div className="reservations-detail--data">{detailData.reserverName}</div>
            </div>
            <div className="reservations-detail--container">
                <div className="reservations-detail--label">利用者</div>
                <div className="reservations-detail--data">{detailData.guestName}</div>
            </div>
            <div className="reservations-detail--container">
                <div className="reservations-detail--label">利用者詳細</div>
                <div className="reservations-detail--data">{detailData.guestDetail}</div>
            </div>
            <div className="reservations-detail--container">
                <div className="reservations-detail--label">利用者目的</div>
                <div className="reservations-detail--data">{detailData.purpose}</div>
            </div>
        </div>
        
    );
};
