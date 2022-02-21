import { React, useState, useEffect } from "react";
import { deleteRoom, putRoom } from "../../apis/roomRequest";
import './RoomListltem.css'

export const RoomListItem = ({ room, updateRoom }) => {
  const [name, setName] = useState(room.name);
  const [detail, setDetail] = useState(room.detail);
  const [isEdit, setIsEdit] = useState(false);

  const toggleEdit = () => {
    setIsEdit((value) => !value);
  };

  // 編集か更新
  const editOrUpdate = async () => {
    if (isEdit) {
      // 編集中なので更新を行う
      if (
        window.confirm(
          room.name == name
            ? `「${name}」を更新してもよろしいですか？`
            : `「${room.name}」を「${name}」に更新してもよろしいですか？`
        )
      ) {
        try {
          await putRoom(room.id, name, detail);
          alert("更新しました");
          updateRoom();
        } catch (err) {
          alert(`更新に失敗しました：${err.message}`);
        }
      }
    }
    toggleEdit();
  };

  // キャンセルか削除
  const cancelOrDelete = async () => {
    if (isEdit) {
      setName(room.name);
      setDetail(room.detail);
      toggleEdit();
    } else {
      // Do Delte method
      if (window.confirm(`「${name}」を削除してもよろしいですか？`)) {
        try {
          await deleteRoom(room.id);
          alert("削除しました");
          updateRoom();
        } catch (err) {
          alert(`削除に失敗しました：${err.message}`);
        }
      }
    }
  };

  useEffect(() => {
  }, [isEdit]);

  return (
    <div className="rooms-list__item" key={room.id}>
      <div className="rooms-list__item-name" key={room.name}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          className="rooms-list__item-input"
          readOnly={!isEdit}
        />
      </div>
      <div className="rooms-list__item-detail" key={room.detail}>
        <textarea
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          className="rooms-list__item-textarea"
          readOnly={!isEdit}
        />
      </div>
      <div className="roomlist-buttons">
        <div>
          <button className="rooms-list__item-edit-button" onClick={editOrUpdate}>
            {isEdit ? "更新" : "編集"}
          </button>
        </div>
        <div>
          <button
            className="rooms-list__item-delete-button"
            onClick={cancelOrDelete}
          >
            {isEdit ? "取り消し" : "削除"}
          </button>
        </div>

      </div>
    </div>
  );
};
