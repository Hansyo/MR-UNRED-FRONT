import { React } from 'react';
import { RoomListItem } from './RoomListItem';

export const RoomList = ({ rooms, updateRooms }) => {

  const updateRoom = () => updateRooms();

  return (
    <div className='rooms-list-container'>
      <h2>ROOM LIST</h2>
      <div className='rooms-list-header' />
      {rooms.map((room) => (
        <RoomListItem room={room} updateRoom={updateRoom} key={room.id}/>
      ))}
    </div>
  );
};