import api from './client';

export const getMyWork =
  async () => {

    return await api.get(
      '/my-work'
    );

  };