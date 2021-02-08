import React from 'react';
import Page from 'components/Page';
import ShrinkImage from 'components/ShrinkImage';
import BigArtworkFlags from './BigArtworkFlags.png';

const Home: React.FC = () => (
  <Page>
    <ShrinkImage src={BigArtworkFlags} alt="ACS flags logo" />
  </Page>
);

export default Home;
