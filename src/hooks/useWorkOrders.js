import { useQuery } from './useQuery';
import {
  getWorkOrdersByProject,
  createWorkOrder,
  updateWorkOrder
} from '../api/workordersApi';
import { getEntry, notify } from './cache';

export const useWorkOrders = (projectId) => {

  const key = `workorders-${projectId}`;

  const query = useQuery(
    key,
    () => getWorkOrdersByProject(projectId)
  );

  // 🔥 MUTATIONS

  const addWorkOrder = async (payload) => {
    const newWO = await createWorkOrder(payload);

    const entry = getEntry(key);

    if (entry?.data) {
      entry.data = [...entry.data, newWO];
      notify(key);
    }

    return newWO;
  };

  const editWorkOrder = async (id, payload) => {
    const updated = await updateWorkOrder(id, payload);

    const entry = getEntry(key);

    if (entry?.data) {
      entry.data = entry.data.map(wo =>
        wo.id === id ? updated : wo
      );
      notify(key);
    }

    return updated;
  };

  return {
    ...query,
    addWorkOrder,
    editWorkOrder
  };
};