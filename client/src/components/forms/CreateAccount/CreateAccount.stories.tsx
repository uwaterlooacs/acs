import React from 'react';
import CreateAccount from '.';

export default {
  component: CreateAccount,
  title: 'CreateAccount',
};

const baseProps = {
  email: 'example@uwaterloo.ca',
};

export const Base = () => <CreateAccount {...baseProps} />;

export const LimittedWidth = () => (
  <div style={{ width: '400px' }}>
    <CreateAccount {...baseProps} />
  </div>
);
