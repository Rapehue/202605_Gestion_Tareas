import './EntornoSelector.css';

const OPTIONS = [

  {
    value: 'DESARROLLO',
    label: 'DES'
  },

  {
    value: 'PREPRODUCCION',
    label: 'PRE'
  },

  {
    value: 'PRODUCCION',
    label: 'PRO'
  }

];

const EntornoSelector = ({
  value,
  onChange
}) => {

  return (

    <div className="env-selector">

      {OPTIONS.map(env => (

        <button

          key={env.value}

          type="button"

          className={
            value === env.value
              ? 'env-btn active'
              : 'env-btn'
          }

          onClick={() =>
            onChange(env.value)
          }

        >

          {env.label}

        </button>

      ))}

    </div>

  );

};

export default EntornoSelector;