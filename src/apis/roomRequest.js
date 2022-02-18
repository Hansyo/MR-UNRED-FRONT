import { requestPost, requestPut, requestGet, requestDelete } from './request'

export const postRoom   = (name, detail)     => requestPost('/rooms', {name, detail});

export const getRooms   =                       requestGet('/rooms/');

export const putRoom    = (id, name, detail) => requestPut(`/rooms/${id}`, {name, detail});

export const deleteRoom = (id)               => requestDelete(`/rooms/${id}`);