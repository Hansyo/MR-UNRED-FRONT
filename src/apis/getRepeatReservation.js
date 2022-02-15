import { requestGet } from './request';

export const getRepeatReservation = (repitationId) => {
  return requestGet(`/repitations/${repitationId}`);
};
