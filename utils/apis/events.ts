import apiClient from "../configs/api";
import { EventsData } from "../interfaces/event.interfaces";

export function CreateEvent({ payload }: { payload: FormData }) {
  return apiClient.post<any>(`/event/create`, payload).then((response) => {
    return response.data;
  });
}

export function GetEvents({ coupleId }: { coupleId: string }) {
  return apiClient
    .get<EventsData[]>(`/event?coupleId=${coupleId}`)
    .then((response) => {
      return response.data;
    });
}
