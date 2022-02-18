import React, { useState, useEffect } from 'react';
import { Header } from '../components/common/Header/Header';
import { getRooms } from '../apis/roomRequest';
import { RoomList } from '../components/RoomManagement/RoomList';
import { RoomAddButton } from '../components/RoomManagement/RoomAddButton';

const RoomManagementPage = () => {
  const [rooms, setRooms] = useState([]);

  const updateRooms = () => {
    (async () => {
      const rooms = await getRooms();
      setRooms(rooms);  
    })();
  };

  // oneshot
  useEffect(() => updateRooms(), []);
  
  return (
    <div>
      <Header />
      <div className='rooms-title'>会議室一覧</div>
      <RoomAddButton updateRoom={updateRooms}/>
      <RoomList rooms={rooms} updateRooms={updateRooms}/>
    </div>
  );
};

export default RoomManagementPage;
