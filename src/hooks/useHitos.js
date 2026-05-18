import { useQuery } from './useQuery';
import {
  getHitosByWorkOrder,
  createHito,
  updateHito
} from '../api/hitosApi';
import { getEntry, notify } from './cache';

export const useHitos = (workOrderId) => {

  const key = `hitos-${workOrderId}`;

  const query = useQuery(
    key,
    () => getHitosByWorkOrder(workOrderId)
  );

  const addHito = async (payload) => {
    const newHito = await createHito(payload);

    const entry = getEntry(key);

    if (entry?.data) {
      entry.data = [...entry.data, newHito];
      notify(key);
    }

    return newHito;
  };

  const editHito = async (id, payload) => {
    const updated = await updateHito(id, payload);

    const entry = getEntry(key);

    if (entry?.data) {
      entry.data = entry.data.map(h =>
        h.id === id ? updated : h
      );
      notify(key);
    }

    return updated;
  };

  return {
    ...query,
    addHito,
    editHito
  };
};