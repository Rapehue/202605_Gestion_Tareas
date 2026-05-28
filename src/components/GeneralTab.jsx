import { Card } from "./ui";
import Grid from '@/layout/primitives/Grid';
import {
  FolderKanban,
  Target,
  Users,
  User,
  Briefcase
} from 'lucide-react';

import './GeneralTab.css';

const GeneralTab = ({ project }) => {

  return (
    <div className="project-sections">

      {/* ===================================================== */}
      {/* CATALOGACIÓN */}
      {/* ===================================================== */}

      <Card className="project-detail-card">

        <div className="project-detail-card-header">

          <div className="section-heading">

            <div className="section-icon blue">

              <FolderKanban size={18} />

            </div>

            <div>

              <h3>
                Catalogación
              </h3>

              <p>
                Información estratégica
                del proyecto
              </p>

            </div>

          </div>

        </div>

        <Grid columns={2} gap="lg">

          <div className="project-info-block">

            <span className="project-info-label">
              PLAN
            </span>

            <strong className="project-info-value">
              {project?.plan || '-'}
            </strong>

          </div>

          <div className="project-info-block">

            <span className="project-info-label">
              EJE
            </span>

            <strong className="project-info-value">
              {project?.eje || '-'}
            </strong>

          </div>

          <div className="project-info-block">

            <span className="project-info-label">
              INICIATIVA
            </span>

            <strong className="project-info-value">
              {project?.iniciativa || '-'}
            </strong>

          </div>

          <div className="project-info-block">

            <span className="project-info-label">
              SUBINICIATIVA
            </span>

            <strong className="project-info-value">
              {project?.subiniciativa || '-'}
            </strong>

          </div>

        </Grid>

      </Card>

      {/* ===================================================== */}
      {/* INTERVINIENTES */}
      {/* ===================================================== */}

      <Card className="project-detail-card">

        <div className="project-detail-card-header">

          <div className="section-heading">

            <div className="section-icon green">

              <Users size={18} />

            </div>

            <div>

              <h3>
                Intervinientes
              </h3>

              <p>
                Responsables y gobierno
                del proyecto
              </p>

            </div>

          </div>

        </div>

        <Grid columns={2} gap="lg">

          <div className="user-info-card">

            <div className="user-avatar">
              <User size={18} />
            </div>

            <div className="user-info-content">

              <span>
                Gestor
              </span>

              <strong>
                {project?.gestor?.nombre_completo || '-'}
              </strong>

            </div>

          </div>

          <div className="user-info-card">

            <div className="user-avatar">
              <User size={18} />
            </div>

            <div className="user-info-content">

              <span>
                Solicitante
              </span>

              <strong>
                {project?.peticionario?.nombre_completo || '-'}
              </strong>

            </div>

          </div>

          <div className="user-info-card">

            <div className="user-avatar">
              <Briefcase size={18} />
            </div>

            <div className="user-info-content">

              <span>
                Proxy
              </span>

              <strong>
                {project?.proxy?.nombre_completo || '-'}
              </strong>

            </div>

          </div>

          <div className="user-info-card">

            <div className="user-avatar">
              <Target size={18} />
            </div>

            <div className="user-info-content">

              <span>
                Product Owner
              </span>

              <strong>
                {project?.productOwner?.nombre_completo || '-'}
              </strong>

            </div>

          </div>

        </Grid>

      </Card>

      {/* ===================================================== */}
      {/* OBJETIVOS */}
      {/* ===================================================== */}

      <Card className="project-detail-card">

        <div className="project-detail-card-header">

          <h3>
            Objetivos
          </h3>

        </div>

        <div className="project-objectives">

          {project?.objetivos || '-'}

        </div>

      </Card>

    </div>
  );
};

export default GeneralTab;