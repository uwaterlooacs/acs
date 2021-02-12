import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Spacer from 'components/Spacer';

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: `${spacing(1)}px 0`,
    padding: spacing(1),
    borderRadius: 8,
    backgroundColor: palette.background.paper,
    height: 200,
  },
}));

const EmptyPosition: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Typography variant="body1" align="center">
        {"Looks like this position doesn't have any nominations yet."}
      </Typography>
      <Spacer height={4} />
      <Typography variant="body2" align="center">
        You should run for this position!
      </Typography>
    </div>
  );
};

export default EmptyPosition;
