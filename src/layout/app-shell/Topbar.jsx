import Breadcrumbs from './Breadcrumbs';
import UserMenu from './UserMenu';

const Topbar = () => {

  return (
    <header className="topbar">

      <Breadcrumbs />

      <div className="topbar-right">

        <input
          className="global-search"
          placeholder="Buscar... (Ctrl + K)"
          readOnly // Evita que escriban directamente si vas a usar un modal flotante
          onClick={() => console.log('Abrir buscador global o modal de comandos')}
        />

        <UserMenu />

      </div>

    </header>
  );
};

export default Topbar;