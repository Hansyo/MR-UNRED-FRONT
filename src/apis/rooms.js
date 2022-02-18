import { requestGet } from "./request";

export const getAllRooms = () => {
  return requestGet('/rooms');
};