// hooks/useProyectos.js

import { useEffect, useState } from 'react';
import { getProyectos } from '../api/proyectosApi';

export const useProyectos = () => {
  const [proyectos, setProyectos] = useState([]);

  useEffect(() => {
    getProyectos().then(res => setProyectos(res.data));
  }, []);

  return { proyectos };
};