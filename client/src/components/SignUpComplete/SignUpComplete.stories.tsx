import React from 'react';
import SignUpComplete from '.';

export default {
  component: SignUpComplete,
  title: 'SignUpComplete',
};

const baseProps = {};

export const Base = () => <SignUpComplete {...baseProps} />;

export const LimittedWidth = () => (
  <div style={{ width: '600px' }}>
    <SignUpComplete {...baseProps} />
  </div>
);
