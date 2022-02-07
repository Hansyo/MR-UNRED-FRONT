import { requestPost } from './request';

export const postReserve = (
  startDateTime,
  endDateTime,
  reserverName,
  purpose,
  guestName,
  guestDetail,
) => {
  return requestPost('/reserve', {
    start_date_time: startDateTime.toISOString(),
    end_date_time: endDateTime.toISOString(),
    reserver_name: reserverName,
    purpose,
    guest_name: guestName,
    guest_detail: guestDetail,
    room_id: 1, // TODO: roomIdをセット
  });
};
