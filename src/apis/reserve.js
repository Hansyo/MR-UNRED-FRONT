import { requestPost } from './request';

export const postReserve = async (
  reserveDate,
  reserveTimeFrom,
  reserveTimeTo,
  shouldReserveAllDay,
  reserveRepeat,
  userName,
  description,
  guestName,
  guestDetail,
) => {
  console.log({
    reserveDate,
    reserveTimeFrom,
    reserveTimeTo,
    shouldReserveAllDay,
    reserveRepeat,
    userName,
    description,
    guestName,
    guestDetail,
  });
  await requestPost('/reserve', {
    reserveDate,
    reserveTimeFrom,
    reserveTimeTo,
    shouldReserveAllDay,
    reserveRepeat,
    userName,
    description,
    guestName,
    guestDetail,
  });
};
