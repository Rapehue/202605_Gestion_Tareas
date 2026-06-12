import {
  Target,
  FileText
} from 'lucide-react';

import {
  Card,
  TextArea
} from '@/components/ui';

import './WorkOrderObjectivesSection.css';

const WorkOrderObjectivesSection = ({
  form,
  onChange
}) => {


    console.log(
  'OBJECTIVES SECTION',
  form
);

  return (

    <Card className="wo-form-card">

      <div className="wo-form-section-title">

        <Target size={18} />

        <span>

          Objetivos y alcance

        </span>

      </div>

      <div className="wo-objectives-grid">

        <TextArea
          label="Descripción"
          placeholder="Descripción funcional y operativa de la Work Order..."
          value={form.descripcion || ''}
          onChange={(e) =>
            onChange(
              'descripcion',
              e.target.value
            )
          }
        />

        <TextArea
          label="Objetivo"
          placeholder="Objetivo que se pretende alcanzar con esta Work Order..."
          value={form.objetivo || ''}
          onChange={(e) =>
            onChange(
              'objetivo',
              e.target.value
            )
          }
        />

      </div>

    </Card>

  );

};

export default WorkOrderObjectivesSection;