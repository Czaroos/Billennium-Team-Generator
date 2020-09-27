import './style.scss';
import React from 'react';
import { ButtonInterface } from './model';

export const Button: React.FC<ButtonInterface> = (props) => {
  const { onClick, variant = 'default', children } = props;

  return (
    <button
      className={`button ${variant}`}
      onClick={onClick}
      type={variant === 'submit' ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
};
