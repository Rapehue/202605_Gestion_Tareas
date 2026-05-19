const gaps = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
};

const Stack = ({
  children,
  gap = 'md',
  align = 'stretch'
}) => {

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: gaps[gap],
        alignItems: align
      }}
    >
      {children}
    </div>
  );
};

export default Stack;