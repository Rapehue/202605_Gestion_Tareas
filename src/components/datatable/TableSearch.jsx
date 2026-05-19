const TableSearch = ({
  value,
  onChange
}) => {

  return (
    <div className="datatable-toolbar">

      <input
        type="text"
        placeholder="Buscar..."
        className="datatable-search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />

    </div>
  );
};

export default TableSearch;