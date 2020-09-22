import React from 'react';
import { Box } from '@material-ui/core';
import Page from 'components/Page';
import ShrinkImage from 'components/ShrinkImage';
import BigArtworkFlags from './BigArtworkFlags.png';

function Home() {
  return (
    <Page>
      <Box height="60vh">
        <ShrinkImage src={BigArtworkFlags} alt="ACS flags logo" />
      </Box>
    </Page>
  );
}

export default Home;
