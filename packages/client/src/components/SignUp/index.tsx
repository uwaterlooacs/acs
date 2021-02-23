import React, { useContext, useState } from 'react';
import { UserContext } from 'context/user/state';
import Complete from 'components/Complete';
import { FieldValues } from 'components/forms/UserInfo';
import SignUpForm from 'components/forms/SignUp';
import CreateAccountForm from 'components/forms/CreateAccount';
import { signup } from 'utils/api/user';
import { getDuplicateKeyErrors } from './utils';
import { RequestError } from 'utils/api/request';

const SignUp: React.FC = () => {
  const { setUser, setToken } = useContext(UserContext);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [studentNumber, setStudentNumber] = useState('');
  const [email, setEmail] = useState('');
  const [semester, setSemester] = useState('');
  const [faculty, setFaculty] = useState('');

  const [password, setPassword] = useState('');
  const [reenteredPassword, setReenteredPassword] = useState('');

  const [duplicateKeys, setDuplicateKeys] = useState<Partial<FieldValues>>({});
  const errors = getDuplicateKeyErrors(duplicateKeys, { email, studentNumber });
  const [isInfoEntered, setIsInfoEntered] = useState(false);
  const [isSignupComplete, setIsSignupComplete] = useState(false);

  const onSignUp = async () => {
    const watIAMUserId = email.split('@')[0];
    try {
      const { user, token } = await signup({
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        studentNumber: +studentNumber.trim(),
        email: email.trim(),
        watIAMUserId,
        semester,
        faculty,
        password,
      });
      setUser(user);
      setToken(token);
      setIsSignupComplete(true);
    } catch (err) {
      const error = err as RequestError<{
        duplicateKeys?: Partial<FieldValues>;
      }>;
      if (error.data.duplicateKeys) {
        setIsInfoEntered(false);
        setDuplicateKeys(error.data.duplicateKeys);
      }
    }
  };

  if (isSignupComplete) {
    return <Complete variant="signUp" />;
  }

  if (isInfoEntered) {
    return (
      <CreateAccountForm
        email={email}
        password={password}
        setPassword={setPassword}
        reenteredPassword={reenteredPassword}
        setReenteredPassword={setReenteredPassword}
        onNext={onSignUp}
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
      errors={errors}
      onNext={() => setIsInfoEntered(true)}
    />
  );
};

export default SignUp;
