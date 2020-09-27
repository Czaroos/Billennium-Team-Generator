import './style.scss';
import React, { useState } from 'react';
import { Props } from './model';
import {
  Step,
  Input,
  Role,
  Skill,
  Select,
  Button,
  UserInterface,
} from '../../components';
import { addUser } from '../../api';

export const RegisterUser: React.FC<Props> = (props) => {
  const { setCurrentStep, currentStep } = props;

  const [name, setName] = useState<string>('');
  const [role, setRole] = useState<string>(Role['Forward']);
  const [skill, setSkill] = useState<string>(Skill['Beginner']);

  const getSelectOptions = (iterable: typeof Role | typeof Skill) => {
    return Object.keys(iterable).map((key) => {
      return {
        title: key,
        value: iterable[key],
      };
    });
  };

  const clearForm = () => {
    setName('');
    setRole(Role['Forward']);
    setSkill(Skill['Beginner']);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const newUser: UserInterface = {
        name,
        role,
        skill,
      };
      await addUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      clearForm();
      setCurrentStep(2);
    } catch (err) {
      // change it later to something fancy
      alert(`Name ${name} already exists - please provide unique name`);
    }
  };

  return (
    <div
      className={`registerUser-step-1 ${
        currentStep !== 1 && `registerUser-step-2`
      }`}
    >
      <Step circleColor={'#0b0b25'} numberColor={'#585877'}>
        1
      </Step>
      <div className={`content`}>
        <form onSubmit={handleSubmit}>
          <h5 className={`heading`}>
            Provide us with unique name for your player so that we can assign
            you teammates!
          </h5>
          <Input
            onChange={(e) => setName(e.target.value)}
            label={`Name`}
            value={name}
            required={true}
            autoFocus={true}
          />
          <h5 className={`heading`}>
            Choose a role for your player that suits you best!
          </h5>
          <Select
            onChange={(e) => setRole(e.target.value)}
            name={`role`}
            label={`Role`}
            value={role}
            required={true}
            options={getSelectOptions(Role)}
          />
          <h5 className={`heading`}>
            Evaluate properly your skills and we will find you best teammates
            according to your current skill!
          </h5>
          <Select
            onChange={(e) => setSkill(e.target.value)}
            name={`skill`}
            label={`Skill`}
            value={skill}
            required={true}
            options={getSelectOptions(Skill)}
          />
          <div className={`buttonContainer`}>
            <Button variant={`clear`} onClick={clearForm}>
              Clear
            </Button>
            <Button variant={`submit`}>Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
