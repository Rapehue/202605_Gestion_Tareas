import './card.css';

const Card = ({
  children,
  className = '',
  horizontal = false
}) => {

  return (

    <div
      className={`
        card
        ${horizontal ? 'horizontal' : ''}
        ${className}
      `}
    >

      {children}

    </div>

  );

};

export default Card;