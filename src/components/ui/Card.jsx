import './card.css';

const Card = ({
  children,
  className = '',
  horizontal = false,
  clickable = false,
  ...props
}) => {

  return (

    <div
      className={`
        card
        ${horizontal ? 'horizontal' : ''}
        ${clickable ? 'card-clickable' : ''}
        ${className}
      `}
      {...props}
    >

      {children}

    </div>

  );

};

export default Card;