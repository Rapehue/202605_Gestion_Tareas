import Breadcrumbs from './Breadcrumbs';
import UserMenu from './UserMenu';

const Topbar = () => {

  return (
    <header className="topbar">

      <Breadcrumbs />

      <div className="topbar-right">

        <input
          className="global-search"
          placeholder="Buscar..."
        />

        <UserMenu />

      </div>

    </header>
  );
};

export default Topbar;