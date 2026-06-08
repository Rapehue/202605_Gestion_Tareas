import Card
from '@/components/ui/Card';

const PendingApprovalsCard = ({
  data
}) => {

  return (

    <Card>

      <h3>
        Pendientes
      </h3>

      {

        data.pendingApprovals.map(
          hito => (

            <div
              key={hito.id}
            >

              {hito.codigo}

            </div>

          )
        )

      }

    </Card>

  );

};

export default PendingApprovalsCard;