import './input.css';

const Input = ({
    label,
    error,
    helperText,
    className = '',
    ...props
}) => {

    return (

        <div className="input-wrapper">

            {
                label && (
                    <label className="input-label">
                        {label}
                    </label>
                )
            }

            <input
                className={`
          input-field
          ${error ? 'error' : ''}
          ${className}
        `}
                {...props}
            />

            {
                error && (
                    <span className="input-error">
                        {error}
                    </span>
                )
            }
            {
                !error &&
                helperText && (
                    <span className="input-helper">
                        {helperText}
                    </span>
                )
            }

        </div>

    );

};

export default Input;