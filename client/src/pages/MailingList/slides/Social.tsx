import type { WithStyles, Theme } from '@material-ui/core/styles';

import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import SocialIcons from 'components/SocialIcons';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      width: '90%',
    },
    textContainer: {
      display: 'flex',
      flexDirection: 'column',
      marginBottom: theme.spacing(6),
    },
    socialIconContainer: {
      marginTop: theme.spacing(2),
    },
  });

function Social({ classes }: WithStyles<typeof styles>) {
  return (
    <div className={classes.container}>
      <div className={classes.textContainer}>
        <Typography color="textPrimary" variant="h4" align="center">
          Thanks for your feedback!
        </Typography>
        <Typography color="textPrimary" variant="body1" align="center">
          Make sure to follow us on social media:
        </Typography>
        <div className={classes.socialIconContainer}>
          <SocialIcons />
        </div>
      </div>
    </div>
  );
}

export default withStyles(styles)(Social);
