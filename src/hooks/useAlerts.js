import { useQuery }
  from './useQuery';

import {
  getAlerts
} from '@/api/alertsApi';

export const useAlerts =
  () => {

    return useQuery(

      'alerts',

      async () =>
        await getAlerts()

    );

  };