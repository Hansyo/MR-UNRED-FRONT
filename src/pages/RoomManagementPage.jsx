import React, { useState, useEffect } from 'react';
import { Header } from '../components/common/Header/Header';
import { getRooms } from '../apis/roomRequest';
import { RoomList } from '../components/RoomManagement/RoomList';
import { RoomAddButton } from '../components/RoomManagement/RoomAddButton';
import './RoomManagementPage.css'


const RoomManagementPage = () => {
  const [rooms, setRooms] = useState([]);

  const updateRooms = async () => {
    const rooms = await getRooms();
    setRooms(rooms);  
  };

  // oneshot
  useEffect(() => updateRooms(), []);
  
  return (
    <div>
      <Header />
      <div className='rooms-title'>
        <div>会議室一覧</div>
        <hr className="room-management-page-line"></hr>
      </div>
      
      <div className='rooms-item'>
        <div className='room-list-erea'>
          <RoomList rooms={rooms} updateRooms={updateRooms}/>
        </div>
        <div className='room-add-button-erea'>      
          <RoomAddButton updateRoom={updateRooms}/>
        </div>
      </div>
    </div>
  );
};

export default RoomManagementPage;
