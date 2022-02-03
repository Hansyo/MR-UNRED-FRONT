import { requestGet } from './request';

export const getReserve = async (
    startDateTime,
    endDateTime,
    roomId,
) => {
    const params = {
        start_date_time: startDateTime.toISOString(),
        end_date_time: endDateTime.toISOString(),
        room_id: roomId
    };
    //console.log(startDateTime);
    /* URLSearchParamsは':'が'%3A'になるので注意 */
    const query_params = ((new URLSearchParams(params)).toString()).split('%3A');
    await requestGet('/reserve/?' + query_params.join(':'));
  };