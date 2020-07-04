import React, { useState } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { /*type*/ WithStyles, Theme } from '@material-ui/core/styles';
import Header from 'components/Header';

const styles = (theme: Theme) =>
  createStyles({
    page: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      width: '100%',
      backgroundColor: theme.palette.background.default,
      minHeight: '100vh',
    },
  });

interface Props extends WithStyles<typeof styles> {
  children: React.ReactNode;
}

function Page({ classes, children }: Props) {
  const [isAuthPanelOpen, setIsAuthPanelOpen] = useState(false);

  const openAuthPanel = () => {
    setIsAuthPanelOpen(true);
    console.log({ isAuthPanelOpen });
  };

  return (
    <div className={classes.page}>
      <Header onLoginClicked={openAuthPanel} />
      {children}
    </div>
  );
}

export default withStyles(styles)(Page);
