import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: {
    marginTop: spacing(1),
    borderColor: palette.text.secondary,
  },
}));

const Voting: React.FC = () => {
  const classes = useStyles();
  return <div className={classes.container}>voting</div>;
};

export default Voting;
