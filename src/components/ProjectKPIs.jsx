import { useEffect, useMemo, useState } from 'react';

import {
  Receipt,
  Briefcase,
  CalendarDays
} from 'lucide-react';

import { getWorkOrdersByProject }
  from '../api/workordersApi';

import Card from '@/components/ui/Card';

import './ProjectKPIs.css';

const currencyFormatter =
  new Intl.NumberFormat(
    'es-ES',
    {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }
  );

const numberFormatter =
  new Intl.NumberFormat('es-ES');

const ProjectKPIs = ({
  projectId,
  refresh = 0
}) => {

  const [workOrders, setWorkOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  // =====================================================
  // LOAD
  // =====================================================

  const load = async () => {

    try {

      setLoading(true);

      const response =
        await getWorkOrdersByProject(
          projectId
        );

      const data =
        response?.data ||
        response ||
        [];

      setWorkOrders(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (error) {

      console.error(
        'ERROR PROJECT KPIS:',
        error
      );

      setWorkOrders([]);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    if (!projectId) return;

    load();

  }, [projectId, refresh]);

  // =====================================================
  // KPIs
  // =====================================================

  const kpis = useMemo(() => {

    const totalCost =
      workOrders.reduce(
        (acc, wo) =>
          acc +
          (Number(wo.precio) || 0),
        0
      );

    const totalDays =
      workOrders.reduce(
        (acc, wo) =>
          acc +
          (Number(wo.jornadas) || 0),
        0
      );

    const totalWO =
      workOrders.length;

    return {
      totalCost,
      totalDays,
      totalWO
    };

  }, [workOrders]);

  // =====================================================
  // RENDER
  // =====================================================

  return (

    <div className="project-kpis-grid">

      <Card
        horizontal
        className="project-kpi-card"
      >

        <div className="project-kpi-icon blue">

          <Receipt size={20} />

        </div>

        <div className="project-kpi-content">

          <span className="project-kpi-label">
            Coste Total
          </span>

          <strong className="project-kpi-value">

            {loading
              ? '...'
              : currencyFormatter.format(
                kpis.totalCost
              )
            }

          </strong>

        </div>

      </Card>

      <Card
        horizontal
        className="project-kpi-card"
      >

        <div className="project-kpi-icon purple">

          <CalendarDays size={20} />

        </div>

        <div className="project-kpi-content">

          <span className="project-kpi-label">
            Jornadas
          </span>

          <strong className="project-kpi-value">

            {loading
              ? '...'
              : numberFormatter.format(
                kpis.totalDays
              )
            }

          </strong>

        </div>

      </Card>

      <Card
        horizontal
        className="project-kpi-card"
      >

        <div className="project-kpi-icon green">

          <Briefcase size={20} />

        </div>

        <div className="project-kpi-content">

          <span className="project-kpi-label">
            Work Orders
          </span>

          <strong className="project-kpi-value">

            {loading
              ? '...'
              : numberFormatter.format(
                kpis.totalWO
              )
            }

          </strong>

        </div>

      </Card>

    </div>

  );

};

export default ProjectKPIs;