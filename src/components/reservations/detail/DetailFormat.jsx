import React from 'react';
import './DetailFormat.css';

export const DetailFormat = ({ detailData, repetitionData }) => {
    console.log(detailData);
    const roomName = ["会議室1", "会議室2", "会議室3", "会議室4", "会議室5", "会議室6", "会議室7", "会議室8"];
    const listItems = repetitionData.map((data) => (
        <div key={data.id}>
            {`${((data.start_date_time).slice(0,19)).replace('T','/')} - ${((data.end_date_time).slice(0,19)).replace('T','/')}`} 
        </div>
    ));

    const deleteSingleReservations = () => {
        if (window.confirm("この予約を削除してもよろしいですか？")) {
            console.log("一日だけdeleteするよ");
      }
    };

    const deleteMultipleReservations = () => {
        if (window.confirm("すべての予約削除してもよろしいですか？")) {
            console.log("すべてdeleteするよ"); /*未実装*/
      }
    };

    return (
        <div className="reservations-detail--grid">
            <div className="reservations-detail--container">
                <div className="reservations-detail--label"> 会議室名</div>
                <div className="reservations-detail--data">{roomName[detailData.room_id - 1]}</div>
            </div>
            <div className="reservations-detail--container">
                <div className="reservations-detail--label"> 日時</div>
                <div className="reservations-detail--data">{`${((detailData.start_date_time).slice(0,19)).replace('T','/')} - ${((detailData.end_date_time).slice(0,19)).replace('T','/')}`} </div>
                <div>
                    <button className="reservations-detail--button"
                    onClick={deleteSingleReservations}> 削除 </button>
                </div>
            </div>
            <div className="reservations-detail--container">
                <div className="reservations-detail--label"> 一覧</div>
                <div className="reservations-detail--data">{listItems}</div>
                <div>
                    <button className="reservations-detail--button"
                        onClick={deleteMultipleReservations}> すべて削除 </button>
                </div>
            </div>
            <div className="reservations-detail--container">
                <div className="reservations-detail--label"> 予約者</div>
                <div className="reservations-detail--data">Subscriber</div>
            </div>
            <div className="reservations-detail--container">
                <div className="reservations-detail--label"> 利用者</div>
                <div className="reservations-detail--data">{detailData.guest_name}</div>
            </div>
            <div className="reservations-detail--container">
                <div className="reservations-detail--label"> 利用者詳細</div>
                <div className="reservations-detail--data">{detailData.guest_detail}</div>
            </div>
            <div className="reservations-detail--container">
                <div className="reservations-detail--label"> 利用者目的</div>
                <div className="reservations-detail--data">{detailData.purpose}</div>
            </div>
        </div>
        
    );
};
