import { useEffect, useState } from 'react';

// import ProyectoTable from '../components/ProyectoTable';
import ProyectoModal from '../components/ProyectoModal';

import { getProyectos } from '../api/proyectosApi';
import DataTable from '../components/datatable/DataTable';
import { Navigate } from 'react-router-dom';

import '../styles/Proyectos.css'
import Page from '../layout/page/Page';
import PageHeader from '../layout/page/PageHeader';
import Stack from '../layout/primitives/Stack';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const Proyectos = () => {

  const [proyectos, setProyectos] = useState([]);

  const [open, setOpen] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null);

  const columns = [ // 👈 Quitamos la llave '{' y dejamos solo el corchete
  {
    key: 'codigo',
    label: 'Código'
  },
  {
    key: 'nombre',
    label: 'Proyecto'
  },
  {
    key: 'estado',
    label: 'Estado',
    render: (row) => (
      <span className={`badge ${row.estado}`}>
        {row.estado}
      </span>
    )
  },
  {
    key: 'gestor',
    label: 'Gestor',
    render: (row) => row.gestor?.nombre_completo
  }
]; // 👈 Quitamos la llave '}' al final

  const loadProjects = async () => {

    try {

      const res = await getProyectos();

      // console.log('API RESPONSE:', res.data);

      setProyectos(res.data || []);

    } catch (err) {

      console.error(err);

    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  // 🔥 NUEVO
  const handleEdit = (project) => {
    setSelectedProject(project);
    setOpen(true);
  };

  // 🔥 NUEVO
  const handleNew = () => {
    setSelectedProject(null);
    setOpen(true);
  };

  return (
    <div>
      <Page>

        <Stack gap="lg">

          <PageHeader
            title="Proyectos"
            subtitle="Gestión integral de proyectos"
            actions={
              <Button>
                Nuevo Proyecto
              </Button>
            }
          />

          <Card>

            <DataTable
              columns={columns}
              data={proyectos}
            />

          </Card>

        </Stack>

      </Page>


      <ProyectoModal
        open={open}
        onClose={() => setOpen(false)}
        proyecto={selectedProject}
        onSaved={loadProjects}
      />

    </div>
  );
};

export default Proyectos;