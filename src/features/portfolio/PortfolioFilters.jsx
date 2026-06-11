import './PortfolioFilters.css';

const PortfolioFilters = ({
  search,
  setSearch,
  riskFilter,
  setRiskFilter
}) => {

  return (

    <div className="portfolio-filters">

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

      <select
        value={riskFilter}
        onChange={(e) =>
          setRiskFilter(
            e.target.value
          )
        }
      >

        <option value="">
          Todos los riesgos
        </option>

        <option value="ALTO">
          Riesgo Alto
        </option>

        <option value="MEDIO">
          Riesgo Medio
        </option>

        <option value="BAJO">
          Riesgo Bajo
        </option>

      </select>

    </div>

  );

};

export default PortfolioFilters;