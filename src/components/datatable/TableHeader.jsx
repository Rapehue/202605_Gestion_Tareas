const TableHeader = ({
  columns,
  sortKey,
  sortDirection,
  onSort,
  hasActions
}) => {

  return (
    <thead>

      <tr>

        {columns.map(col => (

          <th
            key={col.key}
            onClick={() => onSort(col.key)}
          >

            <div className="th-content">

              {col.label}

              {sortKey === col.key && (
                <span>
                  {sortDirection === 'asc'
                    ? '▲'
                    : '▼'}
                </span>
              )}

            </div>

          </th>

        ))}

        {hasActions && (
          <th className="sticky-actions">
            Acciones
          </th>
        )}

      </tr>

    </thead>
  );
};

export default TableHeader;