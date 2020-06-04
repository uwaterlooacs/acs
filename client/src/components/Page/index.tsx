import React from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import /*type*/ { WithStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) => createStyles({
  page: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    backgroundColor: theme.palette.background.default,
    minHeight: '100vh',
  }
});

interface Props extends WithStyles<typeof styles> {
  theme: Theme;
  children: React.ReactNode;
}

function Page({ classes, children }: Props) {
  return (
    <div className={classes.page}>
      {children}
    </div>
  );
}

export default withStyles(styles, { withTheme: true })(Page);