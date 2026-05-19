const TableSkeleton = () => {

  return (
    <div className="table-skeleton">

      {Array.from({ length: 8 }).map((_, i) => (

        <div
          key={i}
          className="skeleton-row"
        />

      ))}

    </div>
  );
};

export default TableSkeleton;