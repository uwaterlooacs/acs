import type { WithStyles, Theme } from '@material-ui/core/styles';
import type { Benefit } from './types';

import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Typography, Divider } from '@material-ui/core';
import Row from './Row';
import benefits from './benefits';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
    },
    title: {
      fontWeight: 'bold',
    },
    divider: {
      marginTop: theme.spacing(1),
      backgroundColor: theme.palette.text.primary,
    },
  });

function Benefits({ classes }: WithStyles<typeof styles>) {
  return (
    <div className={classes.container}>
      <Typography variant="h4" align="center" className={classes.title}>
        Member Benefits
      </Typography>
      <Divider className={classes.divider} />
      {benefits.map((benefit: Benefit, index: number) => (
        <Row key={index} benefit={benefit} />
      ))}
    </div>
  );
}

export default withStyles(styles)(Benefits);
