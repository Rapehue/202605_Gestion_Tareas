import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';

import Dashboard from './pages/Dashboard';
import Proyectos from './pages/Proyectos';
import ProjectDetail from './pages/ProjectDetail';

function App() {
  return (
    <BrowserRouter>

      <MainLayout>

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/proyectos" element={<Proyectos />} />
          <Route path="/proyectos/:id" element={<ProjectDetail />} />
        </Routes>

      </MainLayout>

    </BrowserRouter>
  );
}

export default App;