import { /*type*/ WithStyles, Theme } from '@material-ui/core/styles';
import { /*type*/ Benefit } from './types';

import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Typography from '@material-ui/core/Typography';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      margin: `${theme.spacing(2)}px 0`,
    },
    icon: {
      marginRight: theme.spacing(1),
    },
  });

interface Props extends WithStyles<typeof styles> {
  benefit: Benefit;
}

function Row({ classes, benefit }: Props) {
  return (
    <div className={classes.container}>
      <CheckCircleIcon
        style={{ color: benefit.iconColor }}
        className={classes.icon}
      />
      <Typography variant="h5">{benefit.text}</Typography>
    </div>
  );
}

export default withStyles(styles)(Row);
