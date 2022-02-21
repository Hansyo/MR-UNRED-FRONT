import { useState } from "react";
import { React } from "react";
import "./RoomSelect.css";

export const RoomSelect = ({ rooms, setRoomid }) => {
  return (
    <div className="reserve--upper-grid-roomname" onChange={(e) => setRoomid(e.target.value)}>
        <select className="room-select" required>
            {rooms.map((room) => (
                <option className="room-select-item" value={room.id}>{room.name}</option>
            ))}
        </select>
    </div>
  );
};
