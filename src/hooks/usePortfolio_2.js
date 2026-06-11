import { useQuery }
  from '@/hooks/useQuery';

import {
  getPortfolio
} from '@/api/portfolioApi';

export const usePortfolio = () => {

  return useQuery(

    'portfolio',

    async () => {

      const data =
        await getPortfolio();

      return data;

    }

  );

};