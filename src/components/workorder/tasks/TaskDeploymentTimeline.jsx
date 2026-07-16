import { useState } from 'react';

import {
  CheckCircle2,
  Circle,
  Server,
  Rocket,
  Plus
} from 'lucide-react';

import Button from '@/components/ui/Button';
import TaskDeploymentModal from './TaskDeploymentModal';

import { createDeployment } from '@/api/taskDeploymentsApi';

import {
  getDeploymentFlow,
  getDeploymentMap,
  getNextEnvironment
} from '@/utils/deploymentFlow';

import './TaskDeploymentTimeline.css';

import { formatDateTime } from '@/utils/date';

const TaskDeploymentTimeline = ({
  taskId,
  deployments = [],
  taskStatus,
  deploymentFlow = 'STANDARD',
  onRefresh
}) => {

  const [showModal, setShowModal] = useState(false);

  // =====================================================
  // ENTORNOS DEL FLUJO
  // =====================================================

  const deployableEnvironments = getDeploymentFlow(deploymentFlow);

  // =====================================================
  // DESPLIEGUES
  // =====================================================

  const deploymentMap = getDeploymentMap(deployments);

  // =====================================================
  // SIGUIENTE DESPLIEGUE POSIBLE
  // =====================================================

  const nextEnvironment =
    taskStatus === 'PENDIENTE'
      ? null
      : getNextEnvironment(
        deployments,
        deploymentFlow
      );

  const availableEnvironments =
    nextEnvironment
      ? [nextEnvironment.value]
      : [];

  return (

    <div className="deployment-card">

      <div className="deployment-header">

        <Rocket size={18} />

        <span>

          Despliegues

        </span>

      </div>

      {/* ===================== */}
      {/* Timeline */}
      {/* ===================== */}

      <div className="deployment-progress">

        {

          deployableEnvironments.map((env, index) => {

            const isDeployed =
              !!deploymentMap[env.value];

            return (

              <div
                key={env.value}
                className="deployment-step"
              >

                <div
                  className={
                    isDeployed
                      ? 'deployment-icon completed'
                      : 'deployment-icon pending'
                  }
                >

                  {

                    isDeployed

                      ? <CheckCircle2 size={20} />

                      : <Circle size={20} />

                  }

                </div>

                {

                  index <
                  deployableEnvironments.length - 1 && (

                    <div
                      className={
                        deploymentMap[
                          deployableEnvironments[index + 1].value
                        ]
                          ? 'deployment-line completed'
                          : 'deployment-line'
                      }
                    />

                  )

                }

              </div>

            );

          })

        }

      </div>

      {/* ===================== */}
      {/* Lista */}
      {/* ===================== */}

      <div className="deployment-list">

        {

          deployableEnvironments.map(env => {

            const deployment =
              deploymentMap[env.value];

            return (

              <div
                key={env.value}
                className="deployment-row"
              >

                <div className="deployment-env">

                  <Server size={16} />

                  <span>

                    {env.icon} {env.label}

                  </span>

                </div>

                {

                  deployment

                    ? (

                      <div className="deployment-info">

                        <span className="deployment-date">

                          {

                            formatDateTime(
                              deployment.deployment_date
                            )

                          }

                        </span>

                        {

                          deployment.deployment_user && (

                            <span className="deployment-user">

                              {

                                deployment.deployment_user

                              }

                            </span>

                          )

                        }

                      </div>

                    )

                    : (

                      <span className="deployment-pending">

                        Pendiente

                      </span>

                    )

                }

              </div>

            );

          })

        }

      </div>

      {/* ===================== */}
      {/* Botón */}
      {/* ===================== */}

      <div className="deployment-actions">

        {

          availableEnvironments.length > 0 && (

            <Button
              size="sm"
              onClick={() => setShowModal(true)}
            >

              <Plus size={16} />

              Registrar despliegue

            </Button>

          )

        }

      </div>

      {/* ===================== */}
      {/* Modal */}
      {/* ===================== */}

      <TaskDeploymentModal

        open={showModal}

        onClose={() => setShowModal(false)}

        availableEnvironments={availableEnvironments}
        deploymentFlow={deploymentFlow}
        onSave={async payload => {

          await createDeployment(
            taskId,
            payload
          );

          setShowModal(false);

          await onRefresh?.();

        }}

      />

    </div>

  );

};

export default TaskDeploymentTimeline;