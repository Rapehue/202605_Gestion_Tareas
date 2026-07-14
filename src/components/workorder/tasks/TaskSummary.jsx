import Card from '@/components/ui/Card';

import './TaskSummary.css';

const TaskSummary = ({
  total,
  horasTotales,
  pendientes,
  pendientesHoras,
  enCurso,
  enCursoHoras,
  bloqueadas,
  bloqueadasHoras,
  finalizadas,
  finalizadasHoras
}) => {

  return (

    <>

      <div className="task-summary-grid">

        <Card className="task-summary-card">
          <span>Total</span>
          <strong>{total}</strong>
        </Card>

        <Card className="task-summary-card">
          <span>Pendientes</span>
          <strong>{pendientes}</strong>
        </Card>

        <Card className="task-summary-card">
          <span>En Curso</span>
          <strong>{enCurso}</strong>
        </Card>

        <Card className="task-summary-card">
          <span>Bloqueadas</span>
          <strong>{bloqueadas}</strong>
        </Card>

        <Card className="task-summary-card">
          <span>Finalizadas</span>
          <strong>{finalizadas}</strong>
        </Card>

      </div>

      <div className="task-summary-grid">

        <Card className="task-summary-card">
          <span>Total</span>
          <strong>{horasTotales}</strong>
        </Card>

        <Card className="task-summary-card">
          <span>Pendientes</span>
          <strong>{pendientesHoras}</strong>
        </Card>

        <Card className="task-summary-card">
          <span>En Curso</span>
          <strong>{enCursoHoras}</strong>
        </Card>

        <Card className="task-summary-card">
          <span>Bloqueadas</span>
          <strong>{bloqueadasHoras}</strong>
        </Card>

        <Card className="task-summary-card">
          <span>Finalizadas</span>
          <strong>{finalizadasHoras}</strong>
        </Card>

      </div>
    </>
  );

};

export default TaskSummary;