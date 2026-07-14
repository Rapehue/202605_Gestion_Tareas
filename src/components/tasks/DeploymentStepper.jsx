import {
  CheckCircle2,
  Circle
} from 'lucide-react';

import './DeploymentStepper.css';

const DeploymentStepper = ({
  environments,
  completed = []
}) => {

  return (

    <div className="deployment-progress">

      {environments.map((env, index) => {

        const isCompleted =
          completed.includes(env.value);

        return (

          <div
            key={env.value}
            className="deployment-step"
          >

            <div
              className={
                isCompleted
                  ? 'deployment-icon completed'
                  : 'deployment-icon pending'
              }
            >

              {

                isCompleted
                  ? <CheckCircle2 size={20} />
                  : <Circle size={20} />

              }

            </div>

            {

              index < environments.length - 1 && (

                <div
                  className={
                    completed.includes(
                      environments[index + 1].value
                    )
                      ? 'deployment-line completed'
                      : 'deployment-line'
                  }
                />

              )

            }

          </div>

        );

      })}

    </div>

  );

};

export default DeploymentStepper;