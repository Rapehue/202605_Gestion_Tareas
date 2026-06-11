import Badge from '@/components/ui/Badge';
import { TriangleAlert } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/utils/number';

import './PortfolioTable.css';

const PortfolioTable = ({
  projects = []
}) => {

  const navigate = useNavigate();


  const getHealth = (
    presupuesto,
    facturado
  ) => {

    const ratio =
      presupuesto > 0
        ? facturado / presupuesto
        : 0;


    if (ratio >= 0.95) {

      return {
        label: 'Crítico',
        variant: 'danger'
      };

    }

    if (ratio >= 0.80) {

      return {
        label: 'Vigilar',
        variant: 'warning'
      };

    }

    return {
      label: 'Controlado',
      variant: 'success'
    };


  };

  return (


    <div className="portfolio-table-wrapper">

      <table className="portfolio-table">

        <thead>

          <tr>

            <th>Proyecto</th>

            <th>WO</th>

            <th>Presupuesto</th>

            <th>Facturado</th>

            <th>Pendiente</th>

            <th>Avance</th>

            <th>Riesgo</th>

            <th>Alertas</th>

            <th>Salud</th>

          </tr>

        </thead>

        <tbody>

          {projects.length === 0 && (

            <tr>

              <td
                colSpan="9"
                className="portfolio-empty"
              >

                No existen proyectos que cumplan los filtros seleccionados

              </td>

            </tr>

          )}

          {projects.map(project => {

            const presupuesto =
              Number(
                project.presupuesto || 0
              );

            const facturado =
              Number(
                project.facturado || 0
              );

            const pendiente =
              presupuesto - facturado;

            const health =
              getHealth(
                presupuesto,
                facturado
              );

            return (

              <tr
                key={project.id}
                className="portfolio-row"
                onClick={() =>
                  navigate(
                    `/proyectos/${project.id}`
                  )
                }
              >

                <td>

                  <div className="portfolio-project">

                    <strong>

                      {project.nombre}

                    </strong>

                    <span>

                      {project.codigo}
                      {' · '}
                      {project.workOrders}
                      {' WO'}

                    </span>

                  </div>

                </td>

                <td>

                  <strong>

                    {project.workOrders}

                  </strong>

                </td>

                <td className="portfolio-number amount-budget">

                  {formatCurrency(
                    presupuesto
                  )} €

                </td>

                <td className="portfolio-number amount-invoiced">

                  {formatCurrency(
                    facturado
                  )} €

                </td>

                <td className="portfolio-number amount-pending">

                  {formatCurrency(
                    pendiente
                  )} €

                </td>

                <td>

                  <div className="portfolio-progress">

                    <div
                      className="portfolio-progress-bar"
                      style={{
                        width: `${project.progress || 0}%`
                      }}
                    />

                    <span>

                      {project.progress || 0}%

                    </span>

                  </div>

                </td>

                <td>

                  <Badge
                    variant={
                      project.risk === 'ALTO'
                        ? 'danger'
                        : project.risk === 'MEDIO'
                          ? 'warning'
                          : 'success'
                    }
                  >

                    {project.risk === 'ALTO'
                      ? '🔴 Alto'
                      : project.risk === 'MEDIO'
                        ? '🟠 Medio'
                        : '🟢 Bajo'
                    }

                  </Badge>

                </td>

                <td>

                  {project.alerts > 0
                    ? (
                      <Badge variant="danger">

                        <TriangleAlert size={12} />

                        {' '}

                        {project.alerts}

                      </Badge>
                    )
                    : (
                      <Badge variant="success">

                        OK

                      </Badge>
                    )
                  }

                </td>

                <td>

                  <Badge
                    variant={
                      health.variant
                    }
                  >

                    {health.label}

                  </Badge>

                </td>

              </tr>

            );

          })}

        </tbody>

      </table>

    </div>


  );

};

export default PortfolioTable;
