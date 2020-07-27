import React from 'react';
import {
  Typography,
  createStyles,
  WithStyles,
  withStyles,
  Theme,
} from '@material-ui/core';

const styles = (theme: Theme) =>
  createStyles({
    step: {
      marginTop: theme.spacing(12),
      width: 320,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    stepNumber: {
      fontWeight: 'bold',
      marginBottom: theme.spacing(2),
    },
    stepText: {
      fontWeight: 'bold',
      marginBottom: theme.spacing(2),
    },
  });

type Props = WithStyles<typeof styles> & {
  stepNumber: number;
  text: string;
  icon: string;
  iconAlt: string;
};

const Step: React.FC<Props> = ({
  classes,
  stepNumber,
  text,
  icon,
  iconAlt,
}: Props) => {
  return (
    <div className={classes.step}>
      <Typography variant="h6" align="center" className={classes.stepNumber}>
        Step {stepNumber}:
      </Typography>
      <Typography variant="h4" align="center" className={classes.stepText}>
        {text}
      </Typography>
      <img src={icon} alt={iconAlt} />
    </div>
  );
};

export default withStyles(styles)(Step);
