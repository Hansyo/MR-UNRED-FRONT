import { requestPost } from './request';

export const postReserve = (
  roomid,
  startDateTime,
  endDateTime,
  reserverName,
  purpose,
  guestName,
  guestDetail,
  repitationType,
  repitationNum,
  repitationFinishDate,
) => {
  let body = {
    start_date_time: startDateTime.toISOString(),
    end_date_time: endDateTime.toISOString(),
    reserver_name: reserverName,
    purpose,
    guest_name: guestName,
    guest_detail: guestDetail,
    room_id: roomid,
    repitation: {
      type: repitationType,
    }
  }
  if(repitationNum)body.repitation.num = repitationNum;
  if(repitationFinishDate)body.repitation.finish_at = repitationFinishDate;
  return requestPost('/reserve', body);
};
