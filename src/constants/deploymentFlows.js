import { TASK_ENVIRONMENTS } from './taskEnvironments';

export const DEPLOYMENT_FLOWS = {

  STANDARD:

    TASK_ENVIRONMENTS.filter(
      env => env.deployable
    )

};