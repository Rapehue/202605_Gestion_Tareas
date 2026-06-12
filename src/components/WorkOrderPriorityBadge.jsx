import Badge from '@/components/ui/Badge';

import {
  WO_PRIORITY
} from '@/constants/workOrderPriority';

const WorkOrderPriorityBadge = ({
  priority
}) => {

  const config =
    WO_PRIORITY[priority];

  if (!config) return null;

  const Icon =
    config.icon;

  return (

    <Badge
      variant={config.variant}
    >

      <Icon size={12} />

      {config.label}

    </Badge>

  );

};

export default WorkOrderPriorityBadge;