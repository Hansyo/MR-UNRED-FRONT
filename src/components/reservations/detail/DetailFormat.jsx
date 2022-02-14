import React from 'react';
import './DetailFormat.css';

export const DetailFormat = ({ detailData, repetitionData }) => {

    const roomName = ["会議室1", "会議室2", "会議室3", "会議室4", "会議室5", "会議室6", "会議室7", "会議室8"];
    const listItems = repetitionData.map((data) => (
        <div>
            {`${((data.start_date_time).slice(0,19)).replace('T','/')} - ${((data.end_date_time).slice(0,19)).replace('T','/')}`} 
        </div>
    ));
    return (
        <div className="reservations-detail--grid">
            <div className="reservations-detail--container">
                <div className="reservations-detail--label"> 会議室名</div>
                <div className="reservations-detail--data">{roomName[detailData.room_id - 1]}</div>
            </div>
            <div className="reservations-detail--container">
                <div className="reservations-detail--label"> 日時</div>
                <div className="reservations-detail--data">{detailData.start_date_time }-{detailData.end_date_time }</div>
                <div>
                    <button className="reservations-detail--button"> 削除 </button>
                </div>
            </div>
            <div className="reservations-detail--container">
                <div className="reservations-detail--label"> 一覧</div>
                <div className="reservations-detail--data">{listItems}</div>
                <div>
                    <button className="reservations-detail--button"> すべて削除 </button>
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
