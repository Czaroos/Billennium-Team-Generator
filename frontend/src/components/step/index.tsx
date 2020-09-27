import './style.scss';
import React from 'react';
import { StepInterface } from './model';

export const Step: React.FC<StepInterface> = (props) => {
  const { children, circleColor, numberColor } = props;

  return (
    <div className={`circle`} style={{ backgroundColor: circleColor }}>
      <div className={'number'} style={{ color: numberColor }}>
        {children}
      </div>
    </div>
  );
};
