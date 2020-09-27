import './style.scss';
import React, { useEffect, useState } from 'react';
import { Props } from './model';
import { Step, User, UserInterface, Button } from '../../components';
import { getUsers } from '../../api';

export const UserList: React.FC<Props> = (props) => {
  const { setCurrentStep, currentStep } = props;

  const [users, setUsers] = useState<Array<UserInterface>>([]);
  const [currentUser, setCurrentUser] = useState<UserInterface>();
  const [showUsers, setShowUsers] = useState<boolean>(false);

  useEffect(() => {
    if (currentStep !== 2) return;
    setCurrentUser(
      JSON.parse(localStorage.getItem(`currentUser`)!) as UserInterface
    );
    setInterval(() => {
      setShowUsers(true);
    }, 1000);
  }, [currentStep]);

  useEffect(() => {
    getUsers().then((users) => setUsers(users));
  }, []);

  const handleClick = () => {
    setShowUsers(false);
    setCurrentStep(3);
  };

  return (
    <div
      className={`userList-step-1 ${currentStep === 2 && `userList-step-2`} ${
        currentStep === 3 && `userList-step-3`
      }`}
    >
      <Step circleColor={'#525763'} numberColor={'707581'}>
        2
      </Step>
      <div className={`you-section`}>
        <h2>This is You:</h2>
        {currentUser && (
          <User
            name={currentUser.name}
            skill={currentUser.skill}
            role={currentUser.role}
          />
        )}
      </div>
      {currentStep === 2 && (
        <div className={`users-section ${!showUsers && `hidden`}`}>
          <div className={`heading-section`}>
            <h1>And meet your future teammates!</h1>
            <Button onClick={handleClick}>Generate</Button>
          </div>
          <div className={`userList`}>
            {users.map(({ _id, name, skill, role }) => {
              return (
                <User
                  key={_id}
                  _id={_id}
                  name={name}
                  skill={skill}
                  role={role}
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
