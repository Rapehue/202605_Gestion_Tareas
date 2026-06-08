import {
  useEffect,
  useState
} from 'react';

import {
  getMyWork
} from '@/api/myWorkApi';

export const useMyWork =
() => {

  const [data, setData] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  useEffect(() => {

    load();

  }, []);

  const load = async () => {

    try {

      setLoading(true);

      const response =
        await getMyWork();

      setData(response);

    } catch (err) {

      setError(err);

    } finally {

      setLoading(false);

    }

  };

  return {

    data,
    loading,
    error,
    reload: load

  };

};