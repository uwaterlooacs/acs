import type { WithStyles, Theme } from '@material-ui/core';

import React from 'react';
import {
  Typography,
  createStyles,
  withStyles,
  Divider,
  Box,
  useMediaQuery,
} from '@material-ui/core';
import Benefits from 'components/Benefits';
import SignUp from 'components/SignUp';

const styles = (theme: Theme) =>
  createStyles({
    title: {
      fontWeight: 'bold',
    },
    body: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: `0 ${theme.spacing(4)}px`,
      margin: `${theme.spacing(12)}px 0`,
      [theme.breakpoints.down('sm')]: {
        flexDirection: 'column',
        padding: 0,
      },
    },
  });

type Props = WithStyles<typeof styles> & {
  theme: Theme;
};

const SignUpPage: React.FC<Props> = ({ theme, classes }: Props) => {
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Typography variant="h2" className={classes.title} align="center">
        Join ACS Today
      </Typography>
      <div className={classes.body}>
        <Box flex={1} padding={2} maxWidth={500}>
          <Benefits />
        </Box>
        {!isMobile && <Divider orientation="vertical" flexItem />}
        <Box flex={1} padding={2} maxWidth={500} marginTop={isMobile ? 6 : 0}>
          <SignUp />
        </Box>
      </div>
    </div>
  );
};

export default withStyles(styles, { withTheme: true })(SignUpPage);
