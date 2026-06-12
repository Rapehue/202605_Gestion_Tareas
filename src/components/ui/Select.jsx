import './select.css';

const Select = ({
    label,
    error,
    helperText,
    children,
    className = '',
    ...props
}) => {

    return (

        <div className="select-wrapper">

            {
                label && (

                    <label className="select-label">

                        {label}

                    </label>

                )
            }

            <select
                className={`
          select-field
          ${error ? 'error' : ''}
          ${className}
        `}
                {...props}
            >

                {children}

            </select>

            {
                error && (

                    <span className="select-error">

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

export default Select;