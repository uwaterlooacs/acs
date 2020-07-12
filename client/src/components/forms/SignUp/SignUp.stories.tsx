import React from 'react';
import SignUp from '.';

export default {
  component: SignUp,
  title: 'SignUp',
};

export const Base = () => <SignUp />;

export const LimittedWidth = () => (
  <div style={{ width: '400px' }}>
    <SignUp />
  </div>
);
