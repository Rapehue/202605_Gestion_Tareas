import { useEffect, useState } from 'react';

import {
  getProjectRoadmap
} from '@/api/dashboardApi';

export const useProjectRoadmap =
  (projectId) => {

    const [data, setData] =
      useState([]);

    const [loading, setLoading] =
      useState(true);

    useEffect(() => {

      load();

    }, [projectId]);

    const load = async () => {

      try {

        setLoading(true);

        const response =
          await getProjectRoadmap(
            projectId
          );

        setData(response || []);

      } finally {

        setLoading(false);

      }

    };

    return {
      data,
      loading
    };

  };