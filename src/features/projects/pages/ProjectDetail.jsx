import { useEffect, useState } from 'react';
// 🔍 Cambiamos 'getProyectos' por la petición directa e individualizada por ID
import { useParams } from 'react-router-dom'; // 👈 1. Importa useParams
import { getProyectoById } from '@/api/proyectosApi';
import {
  ProjectKPIs,
  GeneralTab,
  WorkOrdersPanel,
  WorkOrderModal
} from '@/components';
import '@/styles/projectDetail.css';
import ProjectDashboardPage from '@/features/dashboard/ProjectDashboardPage';
import ProjectRiskCard from '@/features/dashboard/ProjectRiskCard';
import ProjectProgressCard from '@/features/dashboard/ProjectProgressCard';
import ProjectAlerts from '@/features/dashboard/ProjectAlerts';

import { useProjectDashboard } from '@/hooks/useProjectDashboard';
import ProjectExecutiveHeader from '@/features/dashboard/ProjectExecutiveHeader';
import ProjectTimeline from '@/features/dashboard/ProjectTimeline';
import ProjectRoadmap from '@/features/dashboard/ProjectRoadmap';

const ProjectDetail = () => { // 👈 2. Ya no dependemos de recibirlo por prop directo
  const { id } = useParams(); // 👈 3. Extraemos el ":id" real de la URL del navegador
  const projectId = id;

  const {
    data: dashboard,
    loading: dashboardLoading
  } = useProjectDashboard(id);

  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState('general');
  const [openWO, setOpenWO] = useState(false);
  const [selectedWO, setSelectedWO] = useState(null);
  const [showAlerts, setShowAlerts] = useState(false);

  // 💡 Reducimos el ruido de contadores a un único disparador de recarga semántico
  const [triggerReload, setTriggerReload] = useState(false);

  useEffect(() => {
    // 🛡️ Salvaguarda vital: si no hay ID, no hacemos nada
    if (!projectId) return;

    let isMounted = true;

    const loadProject = async () => {
      try {
        const foundProject = await getProyectoById(Number(projectId));
        if (isMounted) {
          setProject(foundProject);
          console.log(foundProject);
        }
      } catch (error) {
        console.error("Error al cargar el detalle del proyecto:", error);
      }
    };

    loadProject();

    return () => {
      isMounted = false;
    };
  }, [projectId, triggerReload]); // 👈 Línea 56 revisada y perfectamente cerrada


  const reloadAll = () => {
    setTriggerReload(prev => !prev); // Alternar el booleano dispara el useEffect de arriba de forma limpia
  };

  if (!project) return <div className="loading-state">Cargando detalles del proyecto...</div>;

  console.log('DASHBOARD', dashboard);

  return (
    <div className="project-detail">

      {/* HEADER */}
      <div className="header">
        {/* Aquí tus datos ya lucen limpios y normalizados */}
        <h2>{project.codigo} - {project.nombre}</h2>
        {/* <span className="subtitle">
          {project.plan} / {project.eje}
        </span> */}
      </div>

      <ProjectExecutiveHeader
        dashboard={dashboard}
        onAlertsClick={() =>
          setShowAlerts(prev => !prev)
        }
      />

      {dashboard &&
        showAlerts &&
        dashboard.alerts?.length > 0 && (

          <div className="project-alerts-container">

            <ProjectAlerts
              alerts={dashboard.alerts}
            />

          </div>

        )}

      {/* KPIs */}
      {/* Pasamos el mismo trigger para que los KPIs se actualicen en sincronía */}
      <ProjectKPIs projectId={projectId} refresh={triggerReload} />

      <ProjectTimeline
        project={project}
      />

      {/* TABS */}
      <div
        className="project-tabs"
        role="tablist"
      >

        <button
          className={`
      project-tab
      ${activeTab === 'general'
              ? 'active'
              : ''
            }
    `}
          onClick={() =>
            setActiveTab('general')
          }
          role="tab"
          aria-selected={
            activeTab === 'general'
          }
        >

          General

        </button>

        <button
          type="button"
          className={`project-tab ${activeTab === 'wo' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('wo');
          }}
        >
          Work Orders
        </button>

        <button
          type="button"
          className={`project-tab ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('dashboard');
          }}
        >
          Dashboard
        </button>

      </div>

      {/* <ProjectRoadmap
        projectId={project.id}
      /> */}

      {/* CONTENIDO */}
      <div className="tab-content">
        <div
          className={`tab-panel ${activeTab === 'general'
              ? 'active'
              : ''
            }`}
        >
          <GeneralTab project={project} />
        </div>

        <div
          className={`tab-panel ${activeTab === 'wo'
              ? 'active'
              : ''
            }`}
        >
          <WorkOrdersPanel
            projectId={projectId}
            refresh={triggerReload} // Sincronizado
            onCreate={() => {
              setSelectedWO(null);
              setOpenWO(true);
            }}
            onEdit={(wo) => {
              setSelectedWO(wo);
              setOpenWO(true);
            }}
          />
        </div>

        <div
          className={`tab-panel ${activeTab === 'dashboard'
              ? 'active'
              : ''
            }`}
        >
          <ProjectDashboardPage
            projectId={project.id}
          />
        </div>
      </div>

      {/* MODAL DE WORK ORDERS */}
      {openWO && (
        <WorkOrderModal
          open={openWO}
          onClose={() => setOpenWO(false)}
          workOrder={selectedWO}
          projectId={projectId}
          onSaved={() => {
            setOpenWO(false);
            reloadAll(); // ⚡ Ejecuta la recarga en cascada de proyecto, KPIs y paneles
          }}
        />
      )}
    </div>
  );
};

export default ProjectDetail;