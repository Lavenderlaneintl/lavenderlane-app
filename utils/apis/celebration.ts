import apiClient from "../configs/api";
import { ICelebration } from "../interfaces/celebration.interfaces";

export function CreateCelebration({ payload }: { payload: ICelebration }) {
  return apiClient
    .post<any>(`/celebration/create`, payload)
    .then((response) => {
      return response.data;
    });
}
