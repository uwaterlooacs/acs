import React from 'react';
import SignUp from '.';

export default {
  title: 'SignUp',
  component: SignUp,
};

export const Base = () => {
  return <SignUp />;
};

export const LimittedWidth = () => (
  <div style={{ width: '600px' }}>
    <SignUp />
  </div>
);
