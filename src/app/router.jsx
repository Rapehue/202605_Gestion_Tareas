import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import { AppShell } from '@/layout';

// Pages
import {
  Dashboard,
  Proyectos,
  ProjectDetail
} from '@/features';

const Router = () => {

  return (
    <BrowserRouter>

      <AppShell>

        <Routes>

          <Route
            path="/"
            element={<Dashboard />}
          />

          <Route
            path="/proyectos"
            element={<Proyectos />}
          />

          <Route
            path="/proyectos/:id"
            element={<ProjectDetail />}
          />

          <Route
            path="*"
            element={<Navigate to="/" />}
          />

        </Routes>

      </AppShell>

    </BrowserRouter>
  );
};

export default Router;