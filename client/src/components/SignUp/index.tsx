import React from 'react';
import { useState } from 'react';
import SignUpComplete from 'components/SignUpComplete';
import SignUpForm from 'components/forms/SignUp';
import CreateAccountForm from 'components/forms/CreateAccount';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [email, setEmail] = useState('');
  const [semester, setSemester] = useState('');
  const [faculty, setFaculty] = useState('');

  const [password, setPassword] = useState('');
  const [reenteredPassword, setReenteredPassword] = useState('');

  const [isInfoEntered, setIsInfoEntered] = useState(false);
  const [isSignupComplete, setIsSignupComplete] = useState(false);

  if (isSignupComplete) {
    return <SignUpComplete />;
  }

  if (isInfoEntered) {
    return (
      <CreateAccountForm
        email={email}
        password={password}
        setPassword={setPassword}
        reenteredPassword={reenteredPassword}
        setReenteredPassword={setReenteredPassword}
        onNext={() => setIsSignupComplete(true)}
      />
    );
  }

  return (
    <SignUpForm
      firstName={firstName}
      setFirstName={setFirstName}
      lastName={lastName}
      setLastName={setLastName}
      studentNumber={studentNumber}
      setStudentNumber={setStudentNumber}
      email={email}
      setEmail={setEmail}
      semester={semester}
      setSemester={setSemester}
      faculty={faculty}
      setFaculty={setFaculty}
      onNext={() => setIsInfoEntered(true)}
    />
  );
};

export default SignUp;
