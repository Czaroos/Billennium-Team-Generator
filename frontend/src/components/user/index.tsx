import './style.scss';
import React, { useState } from 'react';
import { UserInterface } from './model';

export const User: React.FC<UserInterface> = (props) => {
  const { name, role, skill, isSmall = false } = props;
  const [currentUser] = useState(
    JSON.parse(localStorage.getItem(`currentUser`)!) as UserInterface
  );

  return (
    <div
      className={`userContainer ${
        currentUser.name === name && isSmall && `currentUser`
      }`}
    >
      {currentUser.name === name && isSmall && <h4>Hey, it's You!</h4>}
      <img
        className={`avatar`}
        src={`https://api.adorable.io/avatars/100/${name}${role}${skill}`}
      />
      <div className={`row`}>
        <h4 className={`label`}>NAME:</h4>
        <h4>{name}</h4>
      </div>
      {!isSmall && (
        <div className={`flex`}>
          <div className={`row`}>
            <h4 className={`label`}>ROLE:</h4>
            <h4>{role}</h4>
          </div>
          <div className={`row`}>
            <h4 className={`label`}>SKILL:</h4>
            <h4>{skill}</h4>
          </div>
        </div>
      )}
    </div>
  );
};
