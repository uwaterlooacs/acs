import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: spacing(2),
  },
}));

const Events: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="h4">Coming Soon</Typography>
      <br />
      <Typography variant="body1">
        Admins will be able to create new events, update current events and
        delete past events here
      </Typography>
    </div>
  );
};

export default Events;
