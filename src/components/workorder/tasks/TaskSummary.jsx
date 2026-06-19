import Card from '@/components/ui/Card';

import './TaskSummary.css';

const TaskSummary = ({
  total,
  pendientes,
  enCurso,
  bloqueadas,
  finalizadas
}) => {

  return (

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

  );

};

export default TaskSummary;