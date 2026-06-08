import { useState } from 'react';

import {
  ChevronDown,
  ChevronRight
} from 'lucide-react';

import HitoRoadmapRow
from './HitoRoadmapRow';

const RoadmapRow = ({
  workOrder
}) => {

  const [expanded, setExpanded] =
    useState(true);

  const completed =
    workOrder.hitos.filter(
      h => h.estado === 'CONCEDIDO_VB'
    ).length;

  const total =
    workOrder.hitos.length;

  const progress =
    total
      ? Math.round(
          (completed / total) * 100
        )
      : 0;

  return (

    <div className="roadmap-wo">

      <div
        className="roadmap-wo-header"
        onClick={() =>
          setExpanded(!expanded)
        }
      >

        {
          expanded
            ? <ChevronDown size={18} />
            : <ChevronRight size={18} />
        }

        <div>

          <strong>
            {workOrder.codigo}
          </strong>

          <span>
            {workOrder.proveedor}
          </span>

        </div>

        <div>

          {progress}%

        </div>

      </div>

      {
        expanded &&
        workOrder.hitos.map(hito => (

          <HitoRoadmapRow
            key={hito.id}
            hito={hito}
          />

        ))
      }

    </div>

  );

};

export default RoadmapRow;