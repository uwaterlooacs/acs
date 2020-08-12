import React from 'react';
import Complete from '.';

export default {
  component: Complete,
  title: 'Complete',
};

const baseProps = {};

export const BaseSignUp = () => <Complete {...baseProps} variant="signUp" />;

export const LimittedWidthSignUp = () => (
  <div style={{ width: '600px' }}>
    <Complete {...baseProps} variant="signUp" />
  </div>
);

export const BaseRenewMembership = () => (
  <Complete {...baseProps} variant="renewMembership" />
);

export const LimittedWidthRenewMembership = () => (
  <div style={{ width: '600px' }}>
    <Complete {...baseProps} variant="renewMembership" />
  </div>
);
