import { requestGetDetails } from './request';

export const getDetails = (id) => {
  return requestGetDetails(`/reserve/${id}`);
};
