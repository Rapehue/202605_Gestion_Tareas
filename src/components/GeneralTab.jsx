const GeneralTab = ({ project }) => {

  return (
    <div className="section">

      <div className="grid">

        <div>
          <label>Plan</label>
          <p>{project.plan}</p>
        </div>

        <div>
          <label>Eje</label>
          <p>{project.eje}</p>
        </div>

        <div>
          <label>Iniciativa</label>
          <p>{project.iniciativa}</p>
        </div>

        <div>
          <label>Subiniciativa</label>
          <p>{project.subiniciativa}</p>
        </div>

      </div>

      <div style={{ marginTop: 20 }}>
        <label>Objetivos</label>
        <p>{project.objetivos}</p>
      </div>

    </div>
  );
};

export default GeneralTab;