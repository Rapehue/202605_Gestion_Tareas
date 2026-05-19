import { NavLink } from 'react-router-dom';

import {
  LayoutDashboard,
  FolderKanban
} from 'lucide-react';

const Sidebar = () => {

  return (
    <aside className="sidebar">

      <div className="sidebar-logo">
        ERP Projects
      </div>

      <nav className="sidebar-nav">

        <NavLink
          to="/"
          end // 👈 ¡Añade esto aquí! Evita que se active con sub-rutas como /proyectos
          className={({ isActive }) =>
            `
            sidebar-link
            ${isActive ? 'active' : ''}
            `
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        <NavLink
          to="/proyectos"
          className={({ isActive }) =>
            `
            sidebar-link
            ${isActive ? 'active' : ''}
            `
          }
        >
          <FolderKanban size={18} />
          Proyectos
        </NavLink>

      </nav>

    </aside>
  );
};

export default Sidebar;