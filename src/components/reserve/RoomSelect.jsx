import { React } from "react";
import "./RoomSelect.css";

export const RoomSelect = ({ rooms, setRoomid }) => {
  return (
    <div className="reserve--upper-grid-roomname" onChange={(e) => setRoomid(e.target.value)}>
    {rooms.map((room) => (
        <div className="room-select-item" key={room.id}>
          <label>
            <div className="room-name">{room.name}</div>
            <div className="room-detail">{room.detail}</div>
          <input
            type="radio"
            name="rooms"
            value={room.id}
            className="room-select-radio"
            required
          />
          </label>
        </div>
      ))}
    </div>
  );
};
