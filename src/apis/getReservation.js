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
    
    const query_params = new URLSearchParams(params).toString();;  
    return requestGet('/reserve/?' + query_params);
  };