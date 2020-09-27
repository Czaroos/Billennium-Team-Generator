import './style.scss';
import React from 'react';
import { SelectInterface } from './model';

export const Select: React.FC<SelectInterface> = (props) => {
  const { onChange, options, label, name, value, required } = props;

  return (
    <div className={`selectContainer`}>
      {label && <label className={`label`}>{`${label} :`}</label>}
      <select
        onChange={onChange}
        required={required}
        name={name}
        className={`select`}
        value={value}
      >
        {options.map(({ value, title }, index) => {
          return (
            <option key={index} value={value} className={`option`}>
              {title}
            </option>
          );
        })}
      </select>
    </div>
  );
};
