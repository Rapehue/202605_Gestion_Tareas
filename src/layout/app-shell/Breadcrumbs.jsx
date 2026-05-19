import { useLocation } from 'react-router-dom';

const Breadcrumbs = () => {

  const location = useLocation();

  const parts =
    location.pathname
      .split('/')
      .filter(Boolean);

  return (
    <div className="breadcrumbs">

      {parts.length === 0
        ? 'Dashboard'
        : parts.join(' / ')}

    </div>
  );
};

export default Breadcrumbs;