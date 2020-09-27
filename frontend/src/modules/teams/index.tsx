import './style.scss';
import React, { useEffect, useState } from 'react';
import { Props } from './model';
import { Button, Step, UserInterface, User } from '../../components';
import { generateTeam } from '../../api';

export const Teams: React.FC<Props> = (props) => {
  const { setCurrentStep, currentStep } = props;

  const [team, setTeam] = useState<any>();

  useEffect(() => {
    if (currentStep !== 2) return;
    generateTeam(
      JSON.parse(localStorage.getItem('currentUser')!) as UserInterface
    ).then((team) => setTeam(team));
  }, [currentStep]);

  const handleClick = () => {
    setCurrentStep(1);
  };

  return (
    <div
      className={`teams-step-1 ${currentStep === 2 && `teams-step-2`} ${
        currentStep === 3 && `teams-step-3`
      }`}
    >
      <Step circleColor={'#1d3344'} numberColor={'#647786'}>
        3
      </Step>
      {currentStep === 3 && (
        <div className={`teamFlex`}>
          <div className={`teamContainer`}>
            <div className={`teamRow`}>
              {team.forward.map((forward: UserInterface, index: number) => {
                return (
                  <User
                    key={index}
                    name={forward.name}
                    skill={forward.skill}
                    role={forward.role}
                    isSmall={true}
                  />
                );
              })}
            </div>
            <div className={`teamRow`}>
              {team.midfield.map((midfield: UserInterface, index: number) => {
                return (
                  <User
                    key={index}
                    name={midfield.name}
                    skill={midfield.skill}
                    role={midfield.role}
                    isSmall={true}
                  />
                );
              })}
            </div>
            <div className={`teamRow`}>
              {team.defence.map((defence: UserInterface, index: number) => {
                return (
                  <User
                    key={index}
                    name={defence.name}
                    skill={defence.skill}
                    role={defence.role}
                    isSmall={true}
                  />
                );
              })}
            </div>
            <div className={`teamRow`}>
              {team.goalkeeper.map(
                (goalkeeper: UserInterface, index: number) => {
                  return (
                    <User
                      key={index}
                      name={goalkeeper.name}
                      skill={goalkeeper.skill}
                      role={goalkeeper.role}
                      isSmall={true}
                    />
                  );
                }
              )}
            </div>
          </div>

          <div className={`try-again-section`}>
            <h1 className={`teamRow`}>And... This is your team!</h1>
            <h2>That was one smooth team generating, wasn't it?</h2>
            <h2 className={`teamRow`}>How about trying it out again?</h2>
            <Button onClick={handleClick}>Try again</Button>
            <div className={`teamrow`}>
              <a href={`https://github.com/Czaroos/Billennium-Team-Generator`}>
                <img
                  src={`https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg`}
                  height="64px"
                />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
