// src/components/tasks/TaskCardEditable.jsx
import { ClipboardList, FileText, AlignLeft, Hash, Tag, PlayCircle, Flag } from 'lucide-react';
import './TaskCardEditable.css';

import ContenedorDesplegable from './ContenedorDesplegable';
import GrupoFormulario from './GrupoFormulario';
import FilaFechas from './FilaFechas';
import CabeceraFormulario from './CabeceraFormulario';
import FilaMetricas from './FilaMetricas';
import TaskStatusBadge from './TaskStatusBadge';
import TaskPriorityBadge from './TaskPriorityBadge';
import EntornoSelector from './EntornoSelector';
import TaskEnvironmentBadge from './TaskEnvironmentBadge';
import TaskDeploymentTimeline from './TaskDeploymentTimeline';

import { TASK_TYPES } from '@/constants/taskTypes';

// const TIPOS_TAREA = {
//   DISENO: 'Diseño',
//   MODELADO: 'Modelado',
//   POWERCENTER: 'PowerCenter',
//   CONTROLM: 'Control-M',
//   DOCUMENTACION: 'Documentación',
//   SIMULACION: 'Simulación',
//   OTROS: 'Otros'
// };

const TaskCardEditable = ({
  task = {},
  index,
  onChange,
  onDuplicate,
  collapsed = false,
  onToggle,
  onRefresh
}) => {
  const {
    codigo = '',
    tipo = 'OTROS',
    estado = 'PENDIENTE',
    prioridad = 'BAJA',
    titulo = '',
    entorno = '',
    descripcion = '',
    fecha_inicio = '',
    fecha_fin = '',
    responsable = '',
    estimacion_horas = 0,
    avance = 0
  } = task;

  const taskType =

    TASK_TYPES[tipo] ||

    TASK_TYPES.OTROS;

  const supportsDeployment =
    taskType.deployment;

  const handleFieldChange = (field, eventOrValue) => {
    let value;
    if (eventOrValue && typeof eventOrValue === 'object' && 'target' in eventOrValue) {
      value = eventOrValue.target.value;
    } else {
      value = eventOrValue;
    }
    onChange?.(index, field, value);

    // Si vuelve a Pendiente
    // eliminamos el entorno

    if (
      field === 'estado' &&
      value === 'pendiente'
    ) {

      onChange?.(
        index,
        'entorno',
        null
      );

    }
  };

  // const mostrarEntorno =

  //   tipo === 'POWERCENTER' &&

  //   estado !== 'PENDIENTE';

  const mostrarEntorno =

    supportsDeployment &&

    estado !== 'PENDIENTE';

  const misCamposCabecera = [
    {
      titulo: 'Código',
      Icono: Hash,
      obligatorio: true,
      value: codigo,
      onChange: (e) => handleFieldChange('codigo', e)
    },
    {
      titulo: 'Tipo de tarea',
      Icono: Tag,
      obligatorio: true,
      value: tipo,
      esTipo: true,
      onChange: (e) => handleFieldChange('tipo', e)
    },
    {
      titulo: 'Estado',
      Icono: PlayCircle,
      obligatorio: true,
      value: estado,
      esEstado: true,
      onChange: (e) => handleFieldChange('estado', e)
    },
    {
      titulo: 'Prioridad',
      Icono: Flag,
      obligatorio: true,
      value: prioridad,
      esPrioridad: true,
      onChange: (e) => handleFieldChange('prioridad', e)
    }
  ];

  const misCampos = [
    {
      Icono: FileText,
      titulo: 'Nombre de la tarea',
      obligatorio: true,
      esTextarea: false,
      placeholder: 'Ej. Diseño arquitectura DWH',
      value: titulo,
      onChange: (e) => handleFieldChange('titulo', e)
    },
    {
      Icono: AlignLeft,
      titulo: 'Descripción',
      obligatorio: false,
      esTextarea: true,
      placeholder: 'Describe la tarea...',
      value: descripcion,
      onChange: (e) => handleFieldChange('descripcion', e)
    }
  ];

  const configFechaIzquierda = {
    titulo: 'Fecha prevista inicio',
    obligatorio: false,
    comentario: 'opcional',
    value: fecha_inicio,
    onChange: (e) => handleFieldChange('fecha_inicio', e)
  };

  const configFechaDerecha = {
    titulo: 'Fecha límite entrega',
    obligatorio: true,
    comentario: '',
    value: fecha_fin,
    onChange: (e) => handleFieldChange('fecha_fin', e)
  };

  const datosResponsable = {
    titulo: 'Responsable',
    obligatorio: true,
    value: responsable,
    onChange: (e) => handleFieldChange('responsable', e),
    opciones: [
      { label: 'Selecciona usuario', value: '' },
      { label: 'Juan Pérez', value: 'juan_perez' },
      { label: 'María Gómez', value: 'maria_gomez' }
    ]
  };

  const datosJornadas = {
    titulo: 'Horas estimadas',
    obligatorio: false,
    value: estimacion_horas,
    onChange: (e) => handleFieldChange('estimacion_horas', e)
  };

  const datosAvance = {
    titulo: '% Avance',
    obligatorio: false,
    value: avance,
    onChange: (e) => handleFieldChange('avance', e)
  };

  // const tipoLabel = TIPOS_TAREA[tipo] || 'Otros';

  const tipoLabel =
    TASK_TYPES[tipo]?.label ||
    TASK_TYPES.OTROS.label;

  console.log('TASK =>', task);

  return (
    <ContenedorDesplegable
      Icono={ClipboardList}
      titulo={titulo || 'Nueva tarea'}
      subtitulo={codigo ? `${codigo} · Planificación operativa` : 'Completa la información'}
      badges={collapsed && (
        <>
          <TaskStatusBadge status={estado} />
          <TaskPriorityBadge priority={prioridad} />
          {task.estado !== 'pendiente' &&
            task.entorno && (
              <TaskEnvironmentBadge
                environment={task.entorno}
              />
            )}
        </>
      )}
      isOpenExternal={!collapsed}
      onToggle={onToggle}
      onDuplicate={() => onDuplicate?.(index)}
    >
      <div className="espaciado-formulario">
        <CabeceraFormulario configCampos={misCamposCabecera} />
        <GrupoFormulario campos={misCampos} />
        <FilaFechas fechaIzquierda={configFechaIzquierda} fechaDerecha={configFechaDerecha} />
        {mostrarEntorno && (

          <div className="task-environment-section">

            <label>

              Entorno actual

            </label>

            <EntornoSelector

              value={entorno || ''}
              disabled={estado === 'pendiente'}

              onChange={(value) =>
                handleFieldChange(
                  'entorno',
                  value
                )
              }

            />

          </div>

        )}
        <FilaMetricas configResponsable={datosResponsable} configJornadas={datosJornadas} configAvance={datosAvance} />
        {/* {tipo === 'POWERCENTER' && */}
        {supportsDeployment &&
          estado !== 'PENDIENTE' && (
            <TaskDeploymentTimeline
              taskId={task.id}
              deployments={task.deployments || []}
              taskStatus={estado}
              deploymentFlow={taskType.deploymentFlow}
              onRefresh={onRefresh}
            />
          )}
      </div>
    </ContenedorDesplegable>
  );
};

export default TaskCardEditable;