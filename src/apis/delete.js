import { requestDelete } from './request';

export const deleteReserve = (id) => {
    return requestDelete(`/reserve/${id}`);
};