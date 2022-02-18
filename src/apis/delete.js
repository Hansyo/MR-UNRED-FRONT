import { requestDelete } from './request';

export const deleteReserve = (id, isAll) => {
    return requestDelete(`/reserve/${id}`, {
        is_all: isAll
    });
};