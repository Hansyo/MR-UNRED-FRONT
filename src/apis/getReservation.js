import { requestGet } from './request';

export const getReserve = async (
    startDateTime,
    endDateTime,
    roomId,
) => {
    const params = {
        start_date_time: startDateTime.toISOString(),
        end_date_time: endDateTime.toISOString(),
        room_Id: roomId
    };
    console.log({
        startDateTime,
        endDateTime,
        roomId,
    });

    const query_params = new URLSearchParams(params);
    await requestGet('reserve/' + query_params);
  };