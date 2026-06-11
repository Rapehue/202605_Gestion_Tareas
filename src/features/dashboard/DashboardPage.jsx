import ExecutiveKPIs from './ExecutiveKPIs';
import StatusSummary from './StatusSummary';
import BudgetSummary from './BudgetSummary';

import {
    useDashboardSummary
} from '@/hooks/useDashboard';

const DashboardPage = () => {

    const {
        data: summary,
        loading,
        error
    } = useDashboardSummary();

    if (loading) {

        return <p>Cargando dashboard...</p>;

    }

    return (

        <div>

            <ExecutiveKPIs
                summary={summary}
            />

            <StatusSummary
                summary={summary}
            />

            <BudgetSummary
                summary={summary}
            />

        </div>

    );

};

export default DashboardPage;