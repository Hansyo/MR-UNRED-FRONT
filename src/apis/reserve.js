import { requestPost } from './request';

export const postReserve = async (
  startDateTime,
  endDateTime,
  reserverName,
  purpose,
  guestName,
  guestDetail,
) => {
  await requestPost('/reserve', {
    start_date_time: startDateTime.toISOString().slice(0, 19), // 2022-01-01T00:00:00
    end_date_time: endDateTime.toISOString().slice(0, 19), // 2022-01-01T00:00:00
    reserver_name: reserverName,
    purpose,
    guest_name: guestName,
    guest_detail: guestDetail,
    room_id: 0, // TODO: roomIdをセット
  });
};
