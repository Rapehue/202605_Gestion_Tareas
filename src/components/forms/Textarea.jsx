import './form.css';

import FormField from './FormField';

const Textarea = ({
  label,
  error,
  required = false,
  rows = 4,
  className = '',
  ...props
}) => {

  return (

    <FormField
      label={label}
      error={error}
      required={required}
    >

      <textarea
        rows={rows}
        className={`
          form-textarea
          ${error ? 'error' : ''}
          ${className}
        `}
        {...props}
      />

    </FormField>

  );

};

export default Textarea;