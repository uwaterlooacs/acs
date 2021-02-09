import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: {
    marginTop: spacing(1),
    borderColor: palette.text.secondary,
  },
}));

const Nomination: React.FC = () => {
  const classes = useStyles();
  return <div className={classes.container}>nomination</div>;
};

export default Nomination;
