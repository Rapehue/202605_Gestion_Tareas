import Badge from '@/components/ui/Badge';

import {
  WO_STATUS
} from '@/constants/workOrderStatus';

const WorkOrderStatusBadge = ({
  status
}) => {

  const config =
    WO_STATUS[status];

  if (!config) {
    return null;
  }

  const Icon =
    config.icon;

  return (

    <Badge
      variant={config.variant}
    >

      <Icon size={12} />

      <span>

        {config.label}

      </span>

    </Badge>

  );

};

export default WorkOrderStatusBadge;