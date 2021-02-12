import type { PositionDoc } from '@acs/shared';

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, ButtonGroup, Typography } from '@material-ui/core';
import Spacer from 'components/Spacer';
import VideoUploader from './VideoUploader';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: spacing(3),
    minWidth: 300,
  },
}));

type Tab = 'Video' | 'Write Up';

type Props = {
  position: PositionDoc;
};

const RunForPositionDialog: React.FC<Props> = ({ position }) => {
  const classes = useStyles();

  const [tab, setTab] = useState<Tab>('Video');

  return (
    <div className={classes.container}>
      <Typography variant="h4">Run for {position.title}</Typography>
      <Spacer height={8} />
      <ButtonGroup fullWidth>
        <Button
          color={tab === 'Video' ? 'primary' : 'secondary'}
          onClick={() => setTab('Video')}
        >
          Video
        </Button>
        <Button
          color={tab === 'Write Up' ? 'primary' : 'secondary'}
          onClick={() => setTab('Write Up')}
        >
          Write Up
        </Button>
      </ButtonGroup>
      <Spacer height={8} />
      <VideoUploader />
    </div>
  );
};

export default RunForPositionDialog;
