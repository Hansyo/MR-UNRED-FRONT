import { React, useState } from "react";
import { postRoom } from "../../apis/roomRequest";
import "./RoomAddButton.css";

export const RoomAddButton = ({ updateRoom }) => {
  const [name, setName] = useState("");
  const [detail, setDetail] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const addRoom = async () => {
    if (window.confirm(`「${name}」を追加してもよろしいですか？`)) {
      try {
        await postRoom(name, detail);
        console.log(`${name}を追加したよ`);
        setName("");
        setDetail("");
        alert("追加しました");
        updateRoom();
      } catch (err) {
        alert(`追加に失敗しました：${err.message}`);
      }
    }
    setIsOpen(false);
  };

  return (
    <div className="room-add-container">
      <button
        className="room-add-form-opener"
        onClick={() => setIsOpen(true)}
        style={{ display: isOpen ? "none" : "" }}
      >
        会議室を追加
      </button>
      <div
        className="room-add-form-container"
        style={{ display: !isOpen ? "none" : "" }}
      >
        <div className="room-add-form__item-name">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            className="rooms-add-form__item-input"
            placeholder="追加する会議室名"
          />
        </div>
        <div className="room-add-form__item-detail">
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            className="rooms-add-form__item-textarea"
            placeholder="追加する部屋の詳細"
          />
        </div>
        <button className="rooms-add-form__item-submit" onClick={addRoom}>
          追加
        </button>
        <button
          className="rooms-add-form__item-delete-button"
          onClick={() => setIsOpen(false)}
        >
          取り消し
        </button>
      </div>
    </div>
  );
};
