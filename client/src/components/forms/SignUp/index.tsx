import React, { useState } from 'react';
import { signup } from 'utils/data/user';
import * as M from 'utils/network/errorMessages';

function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submit = async () => {
    try {
      const { user, token } = await signup({ email, secret: password, name });
      console.log('Sign up successful', user, token);
    } catch (error) {
      console.log(M.SIGN_UP, error);
    }
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <p>Name</p>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
      />
      <p>Email</p>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
      />
      <p>Password</p>
      <input
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type="password"
      />
      <div style={{ marginTop: 10 }}>
        <button onClick={submit}>Create</button>
      </div>
    </div>
  );
}

export default SignUp;
