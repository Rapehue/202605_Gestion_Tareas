import { useEffect, useState } from 'react';
import { getProyectos } from '@/api/proyectosApi';
import {
  ProjectKPIs,
  GeneralTab,
  WorkOrdersPanel,
  WorkOrderModal
} from '@/components';
import '@/styles/projectDetail.css';

const ProjectDetail = ({ projectId }) => {

  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState('general');
  const [openWO, setOpenWO] = useState(false);
  const [selectedWO, setSelectedWO] = useState(null);
  const [refreshWO, setRefreshWO] = useState(0);
  const [refreshKPIs, setRefreshKPIs] = useState(0);


  useEffect(() => {
    load();
  }, [projectId]);

  const load = async () => {
    const res = await getProyectos();
    const found = res.data.find(p => p.id === projectId);
    setProject(found);
  };

  const reloadWorkOrders = () => {
    setRefreshWO(prev => prev + 1);
  };

  const reloadAll = () => {
    setRefreshWO(prev => prev + 1);
    setRefreshKPIs(prev => prev + 1);
  };

  if (!project) return <div>Cargando...</div>;

  return (
    <div className="project-detail">

      {/* HEADER */}
      <div className="header">
        <h2>{project.codigo} - {project.nombre}</h2>
        <span className="subtitle">
          {project.plan} / {project.eje}
        </span>
      </div>

      {/* KPIs */}
      <ProjectKPIs projectId={projectId} refresh={refreshKPIs} />

      {/* TABS */}
      <div className="tabs">
        <button
          className={activeTab === 'general' ? 'active' : ''}
          onClick={() => setActiveTab('general')}
        >
          General
        </button>

        <button
          className={activeTab === 'wo' ? 'active' : ''}
          onClick={() => setActiveTab('wo')}
        >
          Work Orders
        </button>
      </div>

      {/* CONTENIDO */}
      <div className="tab-content">

        {activeTab === 'general' && (
          <GeneralTab project={project} />
        )}

        {activeTab === 'wo' && (
          <WorkOrdersPanel
            projectId={projectId}
            refresh={refreshWO}
            onCreate={() => {
              setSelectedWO(null);
              setOpenWO(true);
            }}
            onEdit={(wo) => {
              setSelectedWO(wo);
              setOpenWO(true);
            }}
          />
        )}

      </div>
      {
        openWO && (
          <WorkOrderModal
            open={openWO}
            onClose={() => setOpenWO(false)}
            workOrder={selectedWO}
            projectId={projectId}
            onSaved={() => {
              setOpenWO(false);
              reloadAll();
            }}
          />
        )
      }
    </div>

  );
};

export default ProjectDetail;