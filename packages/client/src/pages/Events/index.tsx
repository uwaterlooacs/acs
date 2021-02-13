import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Page from 'components/Page';
import { Typography } from '@material-ui/core';
import Spacer from 'components/Spacer';
import SocialIcons from 'components/SocialIcons';

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: `0 ${spacing(2)}px`,
    height: '100%',
  },
  socialContainer: {
    width: '50%',
    [breakpoints.down('md')]: {
      width: '100%',
    },
  },
}));

const EventsPage: React.FC = () => {
  const classes = useStyles();
  return (
    <Page>
      <div className={classes.container}>
        <Typography variant="h4" align="center">
          Follow us on social media to keep up with all of our events!
        </Typography>
        <Spacer height={8} />
        <div className={classes.socialContainer}>
          <SocialIcons />
        </div>
      </div>
    </Page>
  );
};

export default EventsPage;
