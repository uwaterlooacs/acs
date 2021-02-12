import React from 'react';
import Card, { Props } from './Card';
import { action } from '@storybook/addon-actions';
import { VOTING_STAGE } from '@acs/shared';

export default {
  component: Card,
  title: 'NominationCard',
  decorators: [
    (Story: React.FC): React.ReactNode => (
      <div style={{ maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

const baseProps: Props = {
  firstName: 'Joshua',
  lastName: 'Allum',
  semester: '4B',
  faculty: 'Mathematics',
  videoUrl:
    'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  writeUp:
    'This is a lil write up for my nomination oui! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et dolor quam. Vestibulum auctor vehicula ante ut dictum. Nulla neque nunc, blandit vel massa a, rhoncus porta mauris.',
  stage: VOTING_STAGE.Nomination,
  isDisabled: false,
  handleClick: async () => action('handleClick')(),
};
const longWriteUp =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et dolor quam. Vestibulum auctor vehicula ante ut dictum. Nulla neque nunc, blandit vel massa a, rhoncus porta mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et dolor quam. Vestibulum auctor vehicula ante ut dictum. Nulla neque nunc, blandit vel massa a, rhoncus porta mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et dolor quam. Vestibulum auctor vehicula ante ut dictum. Nulla neque nunc, blandit vel massa a, rhoncus porta mauris. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam et dolor quam. Vestibulum auctor vehicula ante ut dictum. Nulla neque nunc, blandit vel massa a, rhoncus porta mauris.';
const portraitVideoUrl =
  'https://firebasestorage.googleapis.com/v0/b/acs-web-5aaaf.appspot.com/o/W20%2Fvoting%2Fvideosubmissions%2F1st%20year%20coordinator%2Fd47a43d8-a26c-4024-9409-6ff280d14fec?alt=media&token=601ead80-f5d9-4961-98b9-c24d8fe3f76d';

export const Base: React.FC = () => <Card {...baseProps} />;

export const Portrait: React.FC = () => (
  <Card {...baseProps} videoUrl={portraitVideoUrl} />
);

export const LongWriteUp: React.FC = () => (
  <Card {...baseProps} writeUp={longWriteUp} />
);

export const LongWriteUpPortrait: React.FC = () => (
  <Card {...baseProps} writeUp={longWriteUp} videoUrl={portraitVideoUrl} />
);

export const NoWriteUp: React.FC = () => (
  <Card {...baseProps} writeUp={undefined} />
);

export const NoVideo: React.FC = () => (
  <Card {...baseProps} videoUrl={undefined} />
);

export const NoWriteUpAndNoVideo: React.FC = () => (
  <Card {...baseProps} writeUp={undefined} videoUrl={undefined} />
);

export const NominationCast: React.FC = () => (
  <Card {...baseProps} isDisabled />
);

export const VotingStage: React.FC = () => (
  <Card {...baseProps} stage={VOTING_STAGE.Vote} />
);

export const VoteCast: React.FC = () => (
  <Card {...baseProps} stage={VOTING_STAGE.Vote} isDisabled />
);
