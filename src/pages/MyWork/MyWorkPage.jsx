import MyWorkKPIs
from './MyWorkKPIs';

import PendingApprovalsCard
from './PendingApprovalsCard';

import MyProjectsCard
from './MyProjectsCard';

import RecentActivityCard
from './RecentActivityCard';

import {
  useMyWork
}
from '@/hooks/useMyWork';

const MyWorkPage = () => {

  const {
    data,
    loading
  } = useMyWork();

  if (loading) {

    return (
      <p>Cargando...</p>
    );

  }

  return (

    <div>

      <MyWorkKPIs
        data={data}
      />

      <PendingApprovalsCard
        data={data}
      />

      <MyProjectsCard
        data={data}
      />

      <RecentActivityCard />

    </div>

  );

};

export default MyWorkPage;