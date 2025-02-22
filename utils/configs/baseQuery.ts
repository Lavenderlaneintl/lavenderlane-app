import { QueryObserverOptions } from "@tanstack/react-query";

export const BASE_QUERY_CONFIG = {
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  retry: 1,
} as QueryObserverOptions;
