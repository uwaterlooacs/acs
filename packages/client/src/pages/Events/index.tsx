import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Page from 'components/Page';
import { Typography } from '@material-ui/core';
import Spacer from 'components/Spacer';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: `0 ${spacing(2)}px`,
    height: '100%',
  },
  text: {
    textAlign: 'center',
  },
}));

const EventsPage: React.FC = () => {
  const classes = useStyles();
  return (
    <Page>
      <div className={classes.container}>
        <Typography variant="h4" align="center">
          Looks like not much is happening right now...
        </Typography>
        <Spacer height={8} />
        <Typography variant="h5" align="center">
          Check in later to see our upcoming events.
        </Typography>
      </div>
    </Page>
  );
};

export default EventsPage;
