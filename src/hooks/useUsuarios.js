// hooks/useUsuarios.js
import { useEffect, useState } from 'react';
import { getUsuarios } from '../api/usuariosApi';

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    getUsuarios().then(res => setUsuarios(res.data));
  }, []);

  return { usuarios };
};