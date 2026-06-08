import ProgressBar
from '@/components/common/ProgressBar';

import {
  CheckCircle2,
  Clock3,
  AlertCircle
} from 'lucide-react';

const HitoRoadmapRow = ({
  hito
}) => {

  const progress =
    hito.estado === 'CONCEDIDO_VB'
      ? 100
      : hito.estado === 'SOLICITADO_VB'
      ? 75
      : 25;

  return (

    <div className="roadmap-hito">

      <div className="roadmap-hito-left">

        {
          hito.estado === 'CONCEDIDO_VB'
          && <CheckCircle2 size={16} />
        }

        {
          hito.estado === 'SOLICITADO_VB'
          && <Clock3 size={16} />
        }

        {
          hito.estado === 'EN_CURSO'
          && <AlertCircle size={16} />
        }

        <span>
          {hito.codigo}
        </span>

      </div>

      <div className="roadmap-hito-center">

        <ProgressBar
          value={progress}
        />

      </div>

      <div className="roadmap-hito-right">

        {progress}%

      </div>

    </div>

  );

};

export default HitoRoadmapRow;