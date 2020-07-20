import React from 'react';
import { action } from '@storybook/addon-actions';
import CreateAccount from '.';

export default {
  component: CreateAccount,
  title: 'CreateAccount',
};

const baseProps = {
  email: 'example@uwaterloo.ca',
  password: '',
  setPassword: action('setPassword'),
  reenteredPassword: '',
  setReenteredPassword: action('setReenteredPassword'),
  onNext: action('onNext'),
};

export const Base = () => <CreateAccount {...baseProps} />;

export const LimittedWidth = () => (
  <div style={{ width: '400px' }}>
    <CreateAccount {...baseProps} />
  </div>
);
