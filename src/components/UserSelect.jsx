// components/UserSelect.jsx

const UserSelect = ({ label, value, onChange, usuarios }) => {
  return (
    <div style={{ marginBottom: '10px' }}>
      <label>{label}</label>
      <select value={value || ''} onChange={e => onChange(e.target.value)}>
        <option value="">-- Seleccionar --</option>
        {usuarios.map(u => (
          <option key={u.id} value={u.id}>
            {u.nombre_completo}
          </option>
        ))}
      </select>
    </div>
  );
};

export default UserSelect;