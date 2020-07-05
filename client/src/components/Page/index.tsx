import React from 'react';
import { /*type*/ Dispatch, SetStateAction } from 'react';
import { /*type*/ WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import Header from 'components/Header';
import AuthPanel from 'components/AuthPanel';

const styles = (theme: Theme) =>
  createStyles({
    page: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      backgroundColor: theme.palette.background.default,
      width: '100vw',
      minHeight: '100vh',
    },
  });

interface Props extends WithStyles<typeof styles> {
  children: React.ReactNode;
  isAuthPanelOpen: boolean;
  setIsAuthPanelOpen: Dispatch<SetStateAction<boolean>>;
}

function Page({
  classes,
  children,
  isAuthPanelOpen,
  setIsAuthPanelOpen,
}: Props) {
  const openAuthPanel = () => {
    setIsAuthPanelOpen(true);
  };

  return (
    <div className={classes.page}>
      <Header onLoginClicked={openAuthPanel} />
      <AuthPanel isOpen={isAuthPanelOpen} setIsOpen={setIsAuthPanelOpen} />
      {children}
    </div>
  );
}

export default withStyles(styles)(Page);
