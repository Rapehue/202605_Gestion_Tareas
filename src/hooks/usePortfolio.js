import { useEffect, useState }
from 'react';

import {
  getPortfolio
}
from '@/api/dashboardApi';

export const usePortfolio =
() => {

  const [data, setData] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    load();

  }, []);

  const load = async () => {

    try {

      setLoading(true);

      const response =
        await getPortfolio();

      setData(response);

    } finally {

      setLoading(false);

    }

  };

  return {
    data,
    loading
  };

};