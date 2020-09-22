import React from 'react';
import VerifyInfo from '.';
import { action } from '@storybook/addon-actions';

export default {
  component: VerifyInfo,
  title: 'VerifyInfo',
};

const baseProps = {};

export const Base = () => (
  <VerifyInfo {...baseProps} onVerify={action('onVerify')} />
);

export const LimittedWidth = () => (
  <div style={{ width: '600px' }}>
    <VerifyInfo {...baseProps} onVerify={action('onVerify')} />
  </div>
);
