import React from 'react';
import BWButton from '.';

export default {
  component: BWButton,
  title: 'BWButton',
};

export const Small = () => <BWButton size="small">Small BWButton</BWButton>;

export const Medium = () => <BWButton size="medium">Medium BWButton</BWButton>;

export const Large = () => <BWButton size="large">Large BWButton</BWButton>;

// for cases where we want to add hover style programmatically
export const HoverClassApplied = () => (
  <BWButton classes={{ root: 'hover' }}>BWButton with Hover Styles</BWButton>
);
