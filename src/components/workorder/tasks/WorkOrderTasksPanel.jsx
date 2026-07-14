// src/components/tasks/WorkOrderTasksPanel.jsx
import { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { getTasksByWorkOrder, createTask, updateTask } from '@/api/workOrderTasksApi';
import TaskCardEditable from './TaskCardEditable';
import TaskSummary from './TaskSummary';
import './WorkOrderTasksPanel.css';

const EMPTY_TASK = {
  codigo: '',
  tipo: 'OTROS',
  estado: 'PENDIENTE', // Sincronizado en mayúsculas con tu backend SQL
  prioridad: 'BAJA',    // Sincronizado en mayúsculas con tu backend SQL
  entorno: null,
  nombre: '',
  descripcion: '',
  fecha_inicio: '',
  fecha_fin: '',
  responsable: '',
  estimacion_horas: 0,
  avance: 0
};

const WorkOrderTasksPanel = ({ workOrderId }) => {
  const [tasks, setTasks] = useState([]);
  const [saving, setSaving] = useState(false);
  const [collapsedTasks, setCollapsedTasks] = useState({});

  const loadTasks = async () => {
    if (!workOrderId) return;
    try {
      const response = await getTasksByWorkOrder(workOrderId);
      const data = response?.data || response || [];
      setTasks(data);

      // Todas cerradas al cargar de base de datos
      const collapsed = {};
      data.forEach((_, index) => {
        collapsed[index] = true;
      });
      setCollapsedTasks(collapsed);
    } catch (error) {
      console.error('Error cargando tareas', error);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [workOrderId]);

  // ==========================================
  // HANDLERS (MODIFICAR, AÑADIR, COLAPSAR)
  // ==========================================
  const handleChange = (
    index,
    field,
    value
  ) => {

    console.log(
      'CAMBIO',
      field,
      value
    );

    setTasks(prev => {

      const updated = [...prev];

      const taskActual =
        updated[index];

      const nuevaTask = {
        ...taskActual,
        [field]: value
      };

      if (
        field === 'estado' &&
        String(value).toUpperCase() === 'PENDIENTE'
      ) {
        nuevaTask.entorno = null;
      }

      updated[index] =
        nuevaTask;

      console.log(
        updated[index]
      );

      return updated;

    });

  };

  const handleAdd = () => {
    setTasks(prev => [
      ...prev,
      {
        ...EMPTY_TASK,
        codigo: `TASK-${String(prev.length + 1).padStart(3, '0')}`
      }
    ]);

    // La nueva tarea creada se despliega de inmediato
    setCollapsedTasks(prev => ({
      ...prev,
      [tasks.length]: false
    }));
  };

  const toggleTask = (index) => {
    setCollapsedTasks(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // ==========================================
  // PERSISTENCIA EN BD (GUARDAR CAMBIOS)
  // ==========================================
  const handleSave = async () => {
    try {
      setSaving(true);
      for (const task of tasks) {
        const payload = {
          ...task,
          id_work_order: workOrderId,
          fecha_inicio:
            task.fecha_inicio || null,

          fecha_fin:
            task.fecha_fin || null
        };

        if (task.id) {
          await updateTask(task.id, payload);
        } else {
          console.log(JSON.stringify(task, null, 2));
          await createTask(payload);
        }
      }

      await loadTasks();
    } catch (error) {
      console.error('Error guardando tareas', error);
    } finally {
      setSaving(false);
    }
  };

  const generateNextCode = (tasks) => {

    const maxNumber = tasks.reduce(
      (max, task) => {

        const match =
          task.codigo?.match(
            /TASK-(\d+)/
          );

        if (!match) return max;

        return Math.max(
          max,
          Number(match[1])
        );

      },
      0
    );

    return `TASK-${String(maxNumber + 1).padStart(3, '0')}`;

  };

  const handleDuplicate = (index) => {

    console.log(
      'Duplicando tarea',
      index
    );

    const sourceTask =
      tasks[index];

    const duplicatedTask = {

      ...sourceTask,

      id: undefined,

      codigo:
        generateNextCode(tasks),

      estado:
        'pendiente',

      avance: 0,

      entorno: null

    };

    setTasks(prev => [

      ...prev,

      duplicatedTask

    ]);

  };

  const refreshTaskData =
    async () => {

      await loadTasks();

    };

  // ==========================================
  // CÓMPUTO DE MÉTRICAS (RESUMEN)
  // ==========================================
  // Nota: Pasados a mayúsculas si tu BD usa 'PENDIENTE', 'EN_CURSO', etc.
  const tareasPendientes =
    tasks.filter(
      t => t.estado?.toUpperCase() === 'PENDIENTE'
    );

  const tareasEnCurso =
    tasks.filter(
      t => t.estado?.toUpperCase() === 'EN_CURSO'
    );

  const tareasBloqueadas =
    tasks.filter(
      t => t.estado?.toUpperCase() === 'BLOQUEADA'
    );

  const tareasFinalizadas =
    tasks.filter(
      t => t.estado?.toUpperCase() === 'FINALIZADA'
    );

  const pendientes = tareasPendientes.length;
  const enCurso = tareasEnCurso.length;
  const bloqueadas = tareasBloqueadas.length;
  const finalizadas = tareasFinalizadas.length;

  const horasPendientes =
    tareasPendientes.reduce(
      (total, task) =>
        total + Number(task.estimacion_horas || 0),
      0
    );

  const horasEnCurso =
    tareasEnCurso.reduce(
      (total, task) =>
        total + Number(task.estimacion_horas || 0),
      0
    );

  const horasBloqueadas =
    tareasBloqueadas.reduce(
      (total, task) =>
        total + Number(task.estimacion_horas || 0),
      0
    );

  const horasFinalizadas =
    tareasFinalizadas.reduce(
      (total, task) =>
        total + Number(task.estimacion_horas || 0),
      0
    );

  const horasTotales =
    tasks.reduce(
      (total, task) =>
        total + Number(task.estimacion_horas || 0),
      0
    );

  return (
    <Card>
      {/* HEADER PANEL */}
      <div className="tasks-header">
        <div>
          <h3>Plan de Trabajo</h3>
          <p>Tareas asociadas a la Work Order</p>
        </div>
        <Button onClick={handleAdd}>
          + Añadir tarea
        </Button>
      </div>

      {/* METRIC BADGES */}
      <TaskSummary
        total={tasks.length}
        horasTotales={horasTotales}
        pendientes={pendientes}
        pendientesHoras={horasPendientes}
        enCurso={enCurso}
        enCursoHoras={horasEnCurso}
        bloqueadas={bloqueadas}
        bloqueadasHoras={horasBloqueadas}
        finalizadas={finalizadas}
        finalizadasHoras={horasFinalizadas}
      />

      {/* TASKS LIST */}
      <div className="tasks-container">
        {tasks.map((task, index) => (
          <TaskCardEditable
            key={task.id || index}
            task={task}
            index={index}
            onChange={handleChange}
            collapsed={collapsedTasks[index] || false}
            onToggle={() => toggleTask(index)}
            onDuplicate={handleDuplicate}
            onRefresh={loadTasks}
          />
        ))}
      </div>

      {/* FOOTER ACTIONS */}
      {workOrderId && (
        <div className="tasks-actions">
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar tareas'}
          </Button>
        </div>
      )}
    </Card>
  );
};

export default WorkOrderTasksPanel;