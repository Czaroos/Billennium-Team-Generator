import React, { useState } from 'react';
import { RegisterUser, UserList, Teams } from './modules';

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <div className={`container`}>
      <RegisterUser currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <UserList currentStep={currentStep} setCurrentStep={setCurrentStep} />
      <Teams currentStep={currentStep} setCurrentStep={setCurrentStep} />
    </div>
  );
};

export default App;
