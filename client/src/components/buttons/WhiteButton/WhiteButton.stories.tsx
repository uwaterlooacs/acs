import React from 'react';
import WhiteButton from '.';

export default {
  component: WhiteButton,
  title: 'WhiteButton',
};

export const Small = () => (
  <WhiteButton size="small">Small White Button</WhiteButton>
);

export const Medium = () => (
  <WhiteButton size="medium">Medium White Button</WhiteButton>
);

export const Large = () => (
  <WhiteButton size="large">Large White Button</WhiteButton>
);

// for cases where we want to add hover style programmatically
export const HoverClassApplied = () => (
  <WhiteButton classes={{ root: 'hover' }}>
    White Button with Hover Styles
  </WhiteButton>
);
