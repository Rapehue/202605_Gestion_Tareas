import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="sidebar">

      <h2 className="logo">PM Tool</h2>

      <nav>

        <NavLink to="/" end>
          Dashboard
        </NavLink>

        <NavLink to="/proyectos">
          Proyectos
        </NavLink>

      </nav>

    </div>
  );
};

export default Sidebar;