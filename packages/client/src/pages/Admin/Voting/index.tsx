import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Stage from './Stage';
import Positions from './Positions';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginTop: spacing(2),
  },
}));

const Voting: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Stage />
      <Positions />
    </div>
  );
};

export default Voting;
