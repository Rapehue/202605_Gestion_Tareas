import './ProjectFilters.css';

const ProjectFilters = ({
  search,
  setSearch
}) => {

  return (

    <div className="project-filters">

      <input

        type="text"

        placeholder="Buscar proyecto..."

        value={search}

        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }

      />

    </div>

  );

};

export default ProjectFilters;