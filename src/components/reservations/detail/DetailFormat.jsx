import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { deleteReserve } from '../../../apis/delete';
import './DetailFormat.css';

export const DetailFormat = ({ detailData, repetitionData}) => {
    const navigate = useNavigate();
    const currentDate = new Date();

    const deleteSingleReservations = async () => {
        if (window.confirm("この予約を削除してもよろしいですか？")) {
            try {
                await deleteReserve(detailData.id, false);
                alert('削除しました');
                navigate(`./../weekly`);
            }catch(err){
                alert(`削除に失敗しました：${err.message}`);
            }
        }
    };

    const deleteRepeatReservations = async () => {
        if (window.confirm("すべての予約削除してもよろしいですか？")) {
            try {
                await deleteReserve(detailData.id, true);
                alert('削除しました');
                navigate(`./../weekly`);
            } catch (err) {
                alert(`削除に失敗しました：${err.message}`);
            }
        }
    };

    const viewSingleDate = () => {return (
        <div className="reservations-detail--container">
            <div className="reservations-detail--label">日時</div>
            <div className="reservations-detail--data">
                {`${detailData.startDateTime} - ${detailData.endDateTime}`}
            </div>
            {(new Date(detailData.startDateTime) > currentDate.getTime()) && (
                <div>
                    <button
                        className="reservations-detail--button"
                        onClick={deleteSingleReservations}
                    >
                        削除
                    </button>
                </div>
            )}
        </div>
    )};

    const viewRepeatDate = () => {
        /* 繰り返し予定の開始時刻が現在の時刻以降の場合のみ表示される
        ただし，残りの繰り返し予定が現在表示している予定だけの場合は表示されない */
        let checkRepeatDate = false;
        return (
            <div className="reservations-detail--container">
                <div className="reservations-detail--label">今後の予約</div>
                {(new Date(repetitionData.slice(-1)[0].startDateTime) > currentDate.getTime()) && (
                    <div className="reservations-detail--data">
                    {repetitionData.map((data) => {
                        if (new Date(data.startDateTime) > currentDate.getTime()) {
                            if (repetitionData.slice(-1)[0].id !== data.id) {
                                checkRepeatDate = true;
                            }
                            if (checkRepeatDate) {
                                return (
                                    <div key={data.id}>
                                        {(detailData.id !== data.id) ?
                                            <Link className="reservations-detail--link" to={`../reservations/${data.id}`}>
                                                {`${data.startDateTime} - ${data.endDateTime}`}
                                            </Link>                                        
                                        :`${data.startDateTime} - ${data.endDateTime}`
                                        }
                                    </div>
                                );
                            }
                        }
                    })}
                    </div>
                )}
                {(checkRepeatDate) && (
                    <div>
                        <button className="reservations-detail--button"
                            onClick={deleteRepeatReservations}>すべて削除</button>
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="reservations-detail--grid">
            <div className="reservations-detail--container">
                <div className="reservations-detail--label">会議室名</div>
                <div className="reservations-detail--data">{detailData.roomName}</div>
            </div>
            {viewSingleDate()}
            {viewRepeatDate()}
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
