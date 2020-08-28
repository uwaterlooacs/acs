import type { WithStyles, Theme } from '@material-ui/core';
import type { ImgIcon } from 'types/imgIcon';

import React from 'react';
import { Typography, createStyles, withStyles } from '@material-ui/core';

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
  icon: ImgIcon;
};

const Step: React.FC<Props> = ({ classes, stepNumber, text, icon }: Props) => {
  return (
    <div className={classes.step}>
      <Typography variant="h6" align="center" className={classes.stepNumber}>
        Step {stepNumber}:
      </Typography>
      <Typography variant="h4" align="center" className={classes.stepText}>
        {text}
      </Typography>
      <img src={icon.src} alt={icon.alt} />
    </div>
  );
};

export default withStyles(styles)(Step);
