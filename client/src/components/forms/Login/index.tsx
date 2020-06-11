import React, { useState } from 'react';
import { login } from 'utils/data/user';
import * as M from 'utils/network/errorMessages';

function Login() {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');

  const submit = async () => {
    try {
      const { user, token } = await login({ email, secret: password });
      console.log('Login successful', user, token);
    } catch(error) {
      console.log(M.LOG_IN, error);
    }
  }

  return (
    <div>
      <h1>Login</h1>
      <p>Email</p>
      <input
        value={email}
        onChange={e => setEmail(e.target.value)}
        type="email"
      />
      <p>Password</p>
      <input
        value={password}
        onChange={e => setPassword(e.target.value)}
        type="password"
      />
      <div style={{ marginTop: 10 }}>
        <button onClick={submit}>Create</button>
      </div>
    </div>
  );
}

export default Login;
