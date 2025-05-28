import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick, children, type, className, disabled, ariaLabel }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${className}`}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  className: PropTypes.string,
  disabled: PropTypes.bool,
  ariaLabel: PropTypes.string,
};

Button.defaultProps = {
  type: 'button',
  className: '',
  disabled: false,
  onClick: () => {},
  ariaLabel: null,
};

export default Button;