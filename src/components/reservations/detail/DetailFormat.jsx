import React from 'react';
import { useNavigate } from 'react-router-dom';
import { deleteReserve } from '../../../apis/delete';
import './DetailFormat.css';

export const DetailFormat = ({ detailData, repetitionData}) => {
    const navigate = useNavigate();
    const currentDate = new Date();

    const deleteSingleReservations = async () => {
        if (window.confirm("この予約を削除してもよろしいですか？")) {
            await deleteReserve(detailData.id, false);
            alert('削除しました');
            navigate(`./../weekly`);
        }
    };

    const deleteRepeatReservations = async () => {
        if (window.confirm("すべての予約削除してもよろしいですか？")) {
            await deleteReserve(detailData.id, true);
            alert('削除しました');
            navigate(`./../weekly`);
        }
    };

    const viewSingleDate = () => {
        const repeatItems = [
            <div className="reservations-detail--data">
                {`${detailData.startDateTime} - ${detailData.endDateTime}`}
            </div>
        ];
        /* 予定の開始時刻が現在の時刻以降の場合のみ，削除ボタンが表示される */
        if (new Date(detailData.startDateTime) > currentDate.getTime()) {
            repeatItems.push(
                <div>
                    <button className="reservations-detail--button"
                        onClick={deleteSingleReservations}>削除</button>
                </div>
            );
        }
        return repeatItems;
    };

    const viewRepeatDate = () => {
        /* 繰り返し予定の開始時刻が現在の時刻以降の場合のみ表示される
        ただし，残りの繰り返し予定が現在表示している予定だけの場合は表示されない */
        if (new Date(repetitionData.slice(-1)[0].startDateTime) > currentDate.getTime()) {
            let checkRepeatDate = false;
            const repeatItems = [
                <div className="reservations-detail--data">
                    {repetitionData.map((data) => {
                        if (new Date(data.startDateTime) > currentDate.getTime()) {
                            if (repetitionData.slice(-1)[0].id !== data.id) {
                                checkRepeatDate = true;
                            }
                            if (checkRepeatDate) {
                                return (
                                    <div>
                                        {`${data.startDateTime} - ${data.endDateTime}`}
                                    </div>
                                );
                            }
                        }
                    })}
                </div>
            ];
            if (checkRepeatDate)
                repeatItems.push(
                    <div>
                        <button className="reservations-detail--button"
                            onClick={deleteRepeatReservations}>すべて削除</button>
                    </div>
                );
            return repeatItems;
        }
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
