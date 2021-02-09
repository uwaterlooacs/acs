import type { WithStyles, Theme } from '@material-ui/core/styles';

import React, { useContext } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { AuthPanelContext } from 'context/authPanel/state';
import Header from 'components/Header';
import AuthPanel from 'components/AuthPanel';
import { AUTH_PANEL_OPTIONS } from 'utils/constants';

const BOTTOM_SPACING = 40;

const styles = (theme: Theme) =>
  createStyles({
    page: {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      backgroundColor: theme.palette.background.default,
      maxWidth: '100vw',
      minHeight: `100vh - ${BOTTOM_SPACING}px`,
      paddingBottom: BOTTOM_SPACING,
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
