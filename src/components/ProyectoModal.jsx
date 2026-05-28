import React, { useState } from 'react';
import Modal  from './Modal'; // Ajusta según tus componentes de interfaz
import ProyectoForm from './ProyectoForm';
import { searchUsuarios } from '@/api/usuariosApi'; // 👈 Asegúrate de apuntar a la ruta correcta de tu archivo de API
import './ProyectoModal.css';
import { createProyecto, updateProyecto } from '@/api/proyectosApi';

const ProyectoModal = ({ open, onClose, onSaved, initialData }) => {
  const [loading, setLoading] = useState(false);
  
  // Guardamos las opciones de usuarios independientes para cada rol
  const [userOptions, setUserOptions] = useState({
    gestor: [],
    peticionario: [],
    product_Owner: [],
    proxy: [],
    LiderD: [],
    LiderV: []
  });

  // =====================================================
  // MANEJADOR DE BÚSQUEDA ASÍNCRONA (Conexión con tu API)
  // =====================================================
  const handleSearchUser = async (roleKey, query) => {
  if (!query || query.trim().length < 1) {
    setUserOptions(prev => ({ ...prev, [roleKey]: [] }));
    return;
  }

  try {
    const response = await searchUsuarios(query);
    
    // 🔍 Imprimimos el objeto completo para entender su estructura real
    // console.log(`📦 Objeto HTTP completo recibido:`, response);

    // 🛡️ CONTROL DE FLUJO: Si 'response.data' no existe, asumimos que 'response' ya son los datos directos
    const rawData = response.data !== undefined ? response.data : response;

    // Nos aseguramos de que termine siendo un array iterable
    const data = Array.isArray(rawData) ? rawData : [];

    // console.log(`📊 Array de usuarios procesable [${roleKey}]:`, data);

    // Mapeamos de forma segura inspeccionando posibles nombres de columnas SQL
    const formattedUsers = data.map(user => ({
      value: user.id || user.id_usuario || user.value, 
      label: user.nombre || user.nombre_completo || user.name || user.username || 'Usuario sin nombre'
    }));

    setUserOptions(prev => ({
      ...prev,
      [roleKey]: formattedUsers
    }));

  } catch (error) {
    console.error(`Error buscando usuarios para el rol [${roleKey}]:`, error);
  }
};

const handleSave = async (data) => {

  try {

    if (initialData?.id) {

      await updateProyecto(
        initialData.id,
        data
      );

    } else {

      await createProyecto(data);

    }

    onSaved?.();

    onClose?.();

  } catch (error) {

    console.error(
      'ERROR SAVING PROJECT:',
      error
    );

  }

};

  return (
    <Modal open={open} onClose={onClose} title="Nuevo Proyecto">
      <ProyectoForm 
        initialData={initialData}
        onSubmit={handleSave}
        loading={loading}
        // 🚀 Pasamos los resultados que ha devuelto la API para cada uno
        userOptions={userOptions}
        // 📡 Pasamos la función encargada de buscar en la base de datos
        onSearchUser={handleSearchUser}
      />
    </Modal>
  );
};

export default ProyectoModal;