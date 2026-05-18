import { useEffect, useState } from 'react';
import { getWorkOrdersByProject } from '../api/workOrdersApi';

const ProjectKPIs = ({ projectId, refresh = 0}) => {

  const [kpis, setKpis] = useState({
    totalCost: 0,
    totalDays: 0,
    totalWO: 0
  });

  useEffect(() => {
    load();
  }, [projectId, refresh]);

  const load = async () => {
    const res = await getWorkOrdersByProject(projectId);

    const list = res.data;

    const totalCost = list.reduce((sum, w) => sum + Number(w.precio || 0), 0);
    const totalDays = list.reduce((sum, w) => sum + Number(w.jornadas || 0), 0);

    setKpis({
      totalCost,
      totalDays,
      totalWO: list.length
    });
  };

  return (
    <div className="kpis">

      <div className="kpi">
        <span>Coste Total</span>
        <strong>{kpis.totalCost} €</strong>
      </div>

      <div className="kpi">
        <span>Jornadas</span>
        <strong>{kpis.totalDays}</strong>
      </div>

      <div className="kpi">
        <span>Work Orders</span>
        <strong>{kpis.totalWO}</strong>
      </div>

    </div>
  );
};

export default ProjectKPIs;