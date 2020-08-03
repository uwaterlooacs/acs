import React from 'react';
import VerifyInfo from '.';

export default {
  component: VerifyInfo,
  title: 'VerifyInfo',
};

const baseProps = {};

export const Base = () => <VerifyInfo {...baseProps} />;

export const LimittedWidth = () => (
  <div style={{ width: '600px' }}>
    <VerifyInfo {...baseProps} />
  </div>
);
