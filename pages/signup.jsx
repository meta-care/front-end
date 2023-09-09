import React, { useState } from 'react';
import { useRouter } from "next/router";
import SignupPage1 from '../components/signup/user/Forms/SignupPage1'
import SignupPage2 from '../components/signup/user/Forms/SignupPage2'
import Tutorial1 from '../components/signup/user/Tutorials/Tutorial1'
import Tutorial2 from '../components/signup/user/Tutorials/Tutorial2'

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({}); // Store user inputs

  const handleNextStep = (data) => {
    // Save user inputs and advance to the next step
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const handleFinish = () => {
    // Handle the completion of the signup process (e.g., redirect the user)
  };

  return (
    //Registration Form
    <>
    {/* Render the appropriate signup form and tutorial based on the step */}
    {step === 1 && (
        <>
          <SignupPage1 onSubmit={handleNextStep} />
          <Tutorial1 onNext={() => setStep(step + 1)} />
        </>
      )}

      {step === 2 && (
        <>
          <SignupPage1 onSubmit={handleNextStep} />
          <Tutorial2 onNext={() => setStep(step + 1)} />
        </>
      )}

      {step === 3 && (
        <>
          <SignupPage1 onSubmit={() => setStep(step + 1)} />
          {/* Hide the Tutorial */}
        </>
      )}

      {step === 4 && (
        <>
          <SignupPage2 onSubmit={() => setStep(step + 1)} />
          {/* Hide the Tutorial */}
        </>
      )}
    </>
  );
};

export default RegistrationForm;