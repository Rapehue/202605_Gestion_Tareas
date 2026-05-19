const Grid = ({
  children,
  columns = 2,
  gap = 24
}) => {

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns:
          `repeat(${columns}, minmax(0, 1fr))`,
        gap
      }}
    >
      {children}
    </div>
  );
};

export default Grid;