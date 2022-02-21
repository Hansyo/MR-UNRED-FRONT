import { React, useState, useEffect } from "react";
import './RoomSelect.css'

export const RoomSelect = (rooms, setRoomid) => {
    if(!rooms) return null;
    return (
        {
            <select 
            value={roomid}
            onChange={(e) => setRoomid(e.target.value)}
            className="room-select"
            required>
            rooms.list.map((option, key) => (
                <option value={option.value}, key={key}>{option.name}</option>
            ))
            </select>
        }
    )
}