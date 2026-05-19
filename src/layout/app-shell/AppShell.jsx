import Sidebar from './Sidebar';
import Topbar from './Topbar';

import './app-shell.css';

const AppShell = ({
  children
}) => {

  return (
    <div className="app-shell">

      <Sidebar />

      <div className="app-shell-main">

        <Topbar />

        <main className="app-shell-content">
          {children}
        </main>

      </div>

    </div>
  );
};

export default AppShell;