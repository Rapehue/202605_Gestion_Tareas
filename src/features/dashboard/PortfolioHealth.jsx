import Card from '@/components/ui/Card';
import { ShieldCheck } from 'lucide-react';

const PortfolioHealth = ({
  summary
}) => {

  return (

    <Card>

      <h3>

        <ShieldCheck size={18} />

        Salud Portfolio

      </h3>

      <div>

        🟢 {
          summary.greenProjects || 0
        }

      </div>

      <div>

        🟡 {
          summary.yellowProjects || 0
        }

      </div>

      <div>

        🔴 {
          summary.redProjects || 0
        }

      </div>

    </Card>

  );

};

export default PortfolioHealth;