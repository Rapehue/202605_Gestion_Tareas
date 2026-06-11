import Badge
  from '@/components/ui/Badge';

import './PortfolioTable.css';

import { useNavigate } from 'react-router-dom';

const PortfolioTable = ({
  projects
}) => {

  const navigate = useNavigate();

  return (

    <table className="portfolio-table">

      <thead>

        <tr>

          <th>Código</th>

          <th>Proyecto</th>

          <th>WO</th>

          <th>Presupuesto</th>

          <th>Facturado</th>

          <th>Avance</th>

          <th>Riesgo</th>

          <th>Alertas</th>

        </tr>

      </thead>

      <tbody>

        {projects.map(project => (

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
              {project.codigo}
            </td>

            <td>
              {project.nombre}
            </td>

            <td>
              {project.workOrders}
            </td>

            <td>

              {project.presupuesto
                ?.toLocaleString('es-ES')} €

            </td>

            <td>

              {project.facturado
                ?.toLocaleString('es-ES')} €

            </td>

            <td>

              {project.progress}%

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

                {project.risk}

              </Badge>

            </td>

            <td>

              {project.alerts > 0
                ? (
                  <Badge variant="danger">

                    ⚠ {project.alerts}

                  </Badge>
                )
                : (
                  <Badge variant="success">

                    OK

                  </Badge>
                )
              }

            </td>

          </tr>

        ))}

      </tbody>

    </table>

  );

};

export default PortfolioTable;