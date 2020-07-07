import React, { useContext } from 'react';
import { /*type*/ WithStyles, Theme } from '@material-ui/core/styles';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { AuthPanelContext } from 'context/authPanel/state';
import Header from 'components/Header';
import AuthPanel from 'components/AuthPanel';
import { AUTH_PANEL_OPTIONS } from 'components/AuthPanel/constants';

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
}

function Page({ classes, children }: Props) {
  const { setIsOpen, setOption } = useContext(AuthPanelContext);

  const openAuthPanel = () => {
    setOption(AUTH_PANEL_OPTIONS.LOGIN);
    setIsOpen(true);
  };

  return (
    <div className={classes.page}>
      <Header onLoginClicked={openAuthPanel} />
      <AuthPanel />
      {children}
    </div>
  );
}

export default withStyles(styles)(Page);
