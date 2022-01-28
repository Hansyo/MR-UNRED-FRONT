import { requestPost } from './request';

export const postReserve = async (
  startDateTime,
  endDateTime,
  reserverName,
  purpose,
  guestName,
  guestDetail,
) => {
  console.log({
    startDateTime,
    endDateTime,
    reserverName,
    purpose,
    guestName,
    guestDetail,
  });
  await requestPost('/reserve', {
    startDateTime,
    endDateTime,
    reserverName,
    purpose,
    guestName,
    guestDetail,
    roomId: 0, // TODO: roomIdをセット
  });
};
