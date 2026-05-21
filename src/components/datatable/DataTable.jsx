import { useState, useEffect } from 'react'; // 👈 Añadimos useEffect
import './datatable.css';

import TableSearch from './TableSearch';
import TablePagination from './TablePagination';
import EmptyState from './EmptyState';
import TableSkeleton from './TableSkeleton';

const DataTable = ({
  columns,
  data = [],
  loading = false,
  emptyMessage = 'Sin datos',
  search = true,
  onRowClick,
  pageSize = 10 // 👈 Podemos definir un tamaño de página por defecto
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // 👈 Estado para la página actual

  // 🔄 Truco vital: si el usuario busca algo, reseteamos a la página 1 
  // para evitar quedarse colgado en una página que ya no existe tras el filtro.
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) {
    return <TableSkeleton />;
  }

  // 1. Primero filtramos los datos por el buscador
  const filteredData = data.filter(row => {
    if (!searchTerm) return true;
    return columns.some(col => {
      const value = row[col.key];
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(searchTerm.toLowerCase());
    });
  });

  // 2. Calculamos los datos de la paginación basándonos en el resultado filtrado
  const totalRows = filteredData.length;
  const totalPages = Math.ceil(totalRows / pageSize) || 1;

  // 3. Troceamos (slice) el array para mostrar solo las filas de la página activa
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  const showEmptyState = filteredData.length === 0;

  return (
    <div className="datatable">

      {search && (
        <TableSearch 
          value={searchTerm} 
          onChange={setSearchTerm} 
        />
      )}

      {showEmptyState ? (
        <EmptyState title={searchTerm ? 'No se encontraron resultados' : emptyMessage} />
      ) : (
        <table>
          <thead>
            <tr>
              {columns.map(col => (
                <th key={col.key}>{col.label}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {paginatedData.map(row => { // 👈 Mapeamos los datos PAGINADOS
              const isClickable = typeof onRowClick === 'function';

              return (
                <tr 
                  key={row.id}
                  onClick={() => isClickable && onRowClick(row)}
                  className={isClickable ? 'row-clickable' : ''}
                >
                  {columns.map(col => (
                    <td key={col.key}>
                      {col.render
                        ? col.render(row[col.key], row)
                        : row[col.key]}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* 4. Conectamos por fin las props de TablePagination */}
      {!showEmptyState && (
        <TablePagination 
          page={currentPage}
          totalPages={totalPages}
          onPrev={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          onNext={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        />
      )}

    </div>
  );
};

export default DataTable;