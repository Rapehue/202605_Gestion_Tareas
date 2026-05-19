const sizes = {
  md: 960,
  lg: 1200,
  xl: 1440
};

const Container = ({
  children,
  size = 'xl'
}) => {

  return (
    <div
      style={{
        width: '100%',
        maxWidth: sizes[size],
        margin: '0 auto',
        padding: '0 24px'
      }}
    >
      {children}
    </div>
  );
};

export default Container;