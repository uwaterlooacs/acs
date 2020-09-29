import React from 'react';
import Benefits from '.';

export default {
  component: Benefits,
  title: 'Benefits',
};

export const Container = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100vw',
      height: '100%',
      backgroundColor: '#f8f8ff',
    }}
  >
    <Benefits />
  </div>
);

export const Base = () => <Benefits />;

export const FixedWidth = () => (
  <div style={{ width: 600 }}>
    <Benefits />
  </div>
);
