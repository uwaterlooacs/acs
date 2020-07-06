import React from 'react';
import { Typography } from '@material-ui/core';

function Home() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h1" align="center" color="textPrimary">
        Hi there
      </Typography>
      <Typography variant="h4" align="center" color="textPrimary">
        Our site is currently under construction
      </Typography>
      <Typography variant="h4" align="center" color="textPrimary">
        Check back soon!
      </Typography>
    </div>
  );
}

export default Home;
