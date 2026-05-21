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

  // Busquemos tu función load() o el bloque donde calculas los KPIs
const load = async () => {
  try {
    // 1. Supongamos que llamas a tu API para traer las órdenes de trabajo
    const response = await getWorkOrdersByProject(projectId);
    
    // 🛡️ 2. EL BLINDAJE VITAL: Aseguramos que si la API falla, viene vacía 
    // o no encuentra datos, 'workOrders' sea SIEMPRE un array nativo []
    const workOrders = response || []; 

    // 3. Tu línea 21 que estaba fallando:
    // Ahora, si workOrders está vacío, el .reduce() no romperá la aplicación; devolverá 0 de forma segura.
    const totalPresupuesto = workOrders.reduce((acumulado, current) => {
      return acumulado + (Number(current.precio) || 0);
    }, 0);

    const totalJornadas = workOrders.reduce((acumulado, current) => {
      return acumulado + (Number(current.jornadas) || 0);
    }, 0);

    // setStates de tus KPIs...
    setKpis({
      presupuesto: totalPresupuesto,
      jornadas: totalJornadas,
      cantidadWo: workOrders.length
    });

  } catch (error) {
    console.error("Error calculando los KPIs del proyecto:", error);
  }
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