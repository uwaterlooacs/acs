import React from 'react';
import { action } from '@storybook/addon-actions';
import CreateAccountForm from '.';

export default {
  component: CreateAccountForm,
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

export const Base = () => <CreateAccountForm {...baseProps} />;

export const LimittedWidth = () => (
  <div style={{ width: '400px' }}>
    <CreateAccountForm {...baseProps} />
  </div>
);
