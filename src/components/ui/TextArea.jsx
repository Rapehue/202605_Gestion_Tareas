import './textarea.css';

const TextArea = ({
  label,
  error,
  className = '',
  ...props
}) => {

  return (

    <div className="textarea-wrapper">

      {
        label && (

          <label className="textarea-label">

            {label}

          </label>

        )
      }

      <textarea
        className={`
          textarea-field
          ${error ? 'error' : ''}
          ${className}
        `}
        {...props}
      />

      {
        error && (

          <span className="textarea-error">

            {error}

          </span>

        )
      }

    </div>

  );

};

export default TextArea;