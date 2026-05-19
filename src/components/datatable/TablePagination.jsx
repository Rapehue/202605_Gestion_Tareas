const TablePagination = ({
  page,
  totalPages,
  onPrev,
  onNext
}) => {

  return (
    <div className="datatable-pagination">

      <button
        disabled={page === 1}
        onClick={onPrev}
      >
        Anterior
      </button>

      <span>
        Página {page} de {totalPages || 1}
      </span>

      <button
        disabled={page === totalPages}
        onClick={onNext}
      >
        Siguiente
      </button>

    </div>
  );
};

export default TablePagination;