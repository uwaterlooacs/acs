import React from 'react';
import ShrinkImage from '.';
import BigArtWorkFlags from './BigArtworkFlags.png';
import AreYouAMember from 'pages/Membership/AreYouAMember.png';

export default {
  component: ShrinkImage,
  title: 'ShrinkImage',
};

export const FullSize = () => (
  <ShrinkImage src={BigArtWorkFlags} alt="ACS Flags Artwork" />
);

export const InShortBlock = () => (
  <div style={{ height: 300 }}>
    <ShrinkImage src={BigArtWorkFlags} alt="ACS Flags Artwork" />
  </div>
);

export const InRelativeVHBlock = () => (
  <div style={{ height: '60vh' }}>
    <ShrinkImage src={BigArtWorkFlags} alt="ACS Flags Artwork" />
  </div>
);

export const WithShift = () => (
  <div style={{ height: '30vh' }}>
    <ShrinkImage src={AreYouAMember} alt="ACS Are you a Member?" shift />
  </div>
);
