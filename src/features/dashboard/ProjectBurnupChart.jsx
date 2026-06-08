import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
}
from 'recharts';

import Card from '@/components/ui/Card';

const ProjectBurnupChart = ({
  data
}) => {

  const chartData = [
    {
      name: 'Presupuesto',
      valor:
        data.workOrders.reduce(
          (s, wo) =>
            s +
            Number(
              wo.precio || 0
            ),
          0
        )
    },
    {
      name: 'Concedido',
      valor:
        data.hitos
          .filter(
            h =>
              h.estado ===
              'CONCEDIDO_VB'
          )
          .reduce(
            (s, h) =>
              s +
              Number(
                h.importe || 0
              ),
            0
          )
    }
  ];

  return (

    <Card>

      <h3>
        Burn-Up
      </h3>

      <ResponsiveContainer
        width="100%"
        height={250}
      >

        <LineChart
          data={chartData}
        >

          <XAxis
            dataKey="name"
          />

          <YAxis />

          <Tooltip />

          <Line
            dataKey="valor"
          />

        </LineChart>

      </ResponsiveContainer>

    </Card>

  );

};

export default ProjectBurnupChart;