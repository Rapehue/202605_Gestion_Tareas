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

const ProjectDetail = () => { // 👈 2. Ya no dependemos de recibirlo por prop directo
  const { id } = useParams(); // 👈 3. Extraemos el ":id" real de la URL del navegador
  const projectId = id;

  const [project, setProject] = useState(null);
  const [activeTab, setActiveTab] = useState('general');
  const [openWO, setOpenWO] = useState(false);
  const [selectedWO, setSelectedWO] = useState(null);

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

      {/* KPIs */}
      {/* Pasamos el mismo trigger para que los KPIs se actualicen en sincronía */}
      <ProjectKPIs projectId={projectId} refresh={triggerReload} />

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
          className={`
      project-tab
      ${activeTab === 'wo'
              ? 'active'
              : ''
            }
    `}
          onClick={() =>
            setActiveTab('wo')
          }
          role="tab"
          aria-selected={
            activeTab === 'wo'
          }
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
        )}
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