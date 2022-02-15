import { requestGet } from './request';

export const getDetails = (id) => {
  return requestGet(`/reserve/${id}`);
};
