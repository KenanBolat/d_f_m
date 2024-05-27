import useSWR, { mutate } from 'swr';
import { useMemo } from 'react';

// Project-imports
import { fetcher } from 'utils/axios';

const initialState = {
  isDashboardDrawerOpened: false,
  isComponentDrawerOpened: true
};

export const endpoints = {
  key: 'api/menu',
  master: 'master',
  dashboard: '/dashboard' // server URL
};

export function useGetMenu() {
  const { data, isLoading, error, isValidating } = useSWR(endpoints.key + endpoints.dashboard, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      menu: data?.dashboard,
      menuLoading: isLoading,
      menuError: error,
      menuValidating: isValidating,
      menuEmpty: !isLoading && !data?.length
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetMenuMaster() {
  const { data, isLoading } = useSWR(endpoints.key + endpoints.master, () => initialState, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      menuMaster: data,
      menuMasterLoading: isLoading
    }),
    [data, isLoading]
  );

  return memoizedValue;
}

export function handlerComponentDrawer(isComponentDrawerOpened) {
  // to update local state based on key

  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster) => {
      return { ...currentMenuMaster, isComponentDrawerOpened };
    },
    false
  );
}

export function handlerDrawerOpen(isDashboardDrawerOpened) {
  // to update local state based on key

  mutate(
    endpoints.key + endpoints.master,
    (currentMenuMaster) => {
      return { ...currentMenuMaster, isDashboardDrawerOpened };
    },
    false
  );
}
