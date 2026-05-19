const gaps = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
};

const Flex = ({
  children,
  gap = 'md',
  justify = 'flex-start',
  align = 'center',
  wrap = false
}) => {

  return (
    <div
      style={{
        display: 'flex',
        gap: gaps[gap],
        justifyContent: justify,
        alignItems: align,
        flexWrap: wrap ? 'wrap' : 'nowrap'
      }}
    >
      {children}
    </div>
  );
};

export default Flex;