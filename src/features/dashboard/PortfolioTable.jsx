import Card from '@/components/ui/Card';

const PortfolioTable = ({
  projects
}) => {

  return (

    <Card>

      <table>

        <thead>

          <tr>

            <th>
              Proyecto
            </th>

            <th>
              Riesgo
            </th>

            <th>
              Avance
            </th>

            <th>
              Alertas
            </th>

          </tr>

        </thead>

      </table>

    </Card>

  );

};

export default PortfolioTable;