const Section = ({
  title,
  children
}) => {

  return (
    <section className="page-section">

      {title && (
        <h2 className="section-title">
          {title}
        </h2>
      )}

      {children}

    </section>
  );
};

export default Section;