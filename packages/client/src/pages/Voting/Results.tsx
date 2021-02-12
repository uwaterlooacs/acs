import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: {
    marginTop: spacing(1),
    borderColor: palette.text.secondary,
  },
}));

const Results: React.FC = () => {
  const classes = useStyles();
  return <div className={classes.container}>results</div>;
};

export default Results;
