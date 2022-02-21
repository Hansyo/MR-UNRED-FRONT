import { React } from 'react';
import { RoomListItem } from './RoomListItem';
import './RoomList.css';

export const RoomList = ({ rooms, updateRooms }) => {

  const updateRoom = () => updateRooms();

  return (
    <div className='rooms-list-container'>
      <div className='rooms-list-detail-graph'>
        <div className='rooms-list-roomname'>会議室名</div>
        <div className='room-list-roomdetail'>詳細情報</div>
        <div className='room-list-changes-button'></div>
      </div>
      <div className='rooms-list-header' />
      {rooms.map((room) => (
        <RoomListItem room={room} updateRoom={updateRoom} key={room.id}/>
      ))}
    </div>
  );
};