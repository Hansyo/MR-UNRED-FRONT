import { requestGet } from './request';

export const getReserve = (
    startDateTime,
    endDateTime,
    roomId,
) => {
    const params = {
        start_date_time: startDateTime.toISOString(),
        end_date_time: endDateTime.toISOString(),
        room_id: roomId
    };
    /* URLSearchParamsは':'が'%3A'になるので注意 */
    const query_params = ((new URLSearchParams(params)).toString()).split('%3A');
    return requestGet('/reserve/?' + query_params.join(':'));
  };