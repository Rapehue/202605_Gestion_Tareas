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
  search = true
}) => {

  if (loading) {
    return <TableSkeleton />;
  }

  if (!data.length) {
    return (
      <EmptyState
        title={emptyMessage}
      />
    );
  }

  return (
    <div className="datatable">

      {search && (
        <TableSearch />
      )}

      <table>

        <thead>

          <tr>

            {columns.map(col => (
              <th key={col.key}>
                {col.label}
              </th>
            ))}

          </tr>

        </thead>

        <tbody>

          {data.map(row => (

            <tr key={row.id}>

              {columns.map(col => (

                <td key={col.key}>

                  {col.render
                    ? col.render(
                        row[col.key],
                        row
                      )
                    : row[col.key]}

                </td>

              ))}

            </tr>

          ))}

        </tbody>

      </table>

      <TablePagination />

    </div>
  );
};

export default DataTable;