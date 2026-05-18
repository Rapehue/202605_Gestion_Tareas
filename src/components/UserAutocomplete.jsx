import AsyncSelect from 'react-select/async';
import { searchUsuarios } from '../api/usuariosApi';

const UserAutocomplete = ({ label, value, onChange }) => {

  const loadOptions = async (inputValue) => {
    if (!inputValue) return [];

    const res = await searchUsuarios(inputValue);

    return res.data.map(u => ({
      value: u.id,
      label: `${u.nombre_completo} (${u.puesto})`
    }));
  };

  return (
    <div style={{ marginBottom: 10 }}>
      <label>{label}</label>

      <AsyncSelect
        cacheOptions
        loadOptions={loadOptions}
        value={value}
        onChange={onChange}
        placeholder="Buscar usuario..."
      />
    </div>
  );
};

export default UserAutocomplete;