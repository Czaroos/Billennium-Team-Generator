import './style.scss';
import React, { useRef, useEffect } from 'react';
import { InputInterface } from './model';

export const Input: React.FC<InputInterface> = (props) => {
  const {
    onChange,
    placeholder,
    label,
    inputRef = () => null,
    required,
    defaultValue,
    autoFocus,
    value,
  } = props;

  const inputEl = useRef<any>(null);

  useEffect(() => {
    if (!inputEl) return;
    inputRef(inputEl.current);
  }, [inputEl]);

  const onLabelClick = () => {
    if (!inputEl) return;
    inputEl.current.focus();
  };

  return (
    <div className={`inputContainer`}>
      {label && (
        <label onClick={onLabelClick} className={`label`}>{`${label} :`}</label>
      )}
      <input
        onChange={onChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
        defaultValue={defaultValue}
        required={required}
        ref={inputEl}
        className={`input`}
        value={value}
      />
    </div>
  );
};
