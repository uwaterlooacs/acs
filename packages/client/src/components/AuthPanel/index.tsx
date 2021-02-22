import type { WithStyles, Theme } from '@material-ui/core/styles';

import React, { memo, useContext } from 'react';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Button, Drawer, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { AuthPanelContext } from 'context/authPanel/state';
import { AUTH_PANEL_OPTIONS } from 'utils/constants';
import CheckStatusPanel from './CheckStatus';
import LoginPanel from './Login';
import Logo from './ACSColorLogo.png';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      width: '30vw',
      height: '100vh',
      paddingBottom: 40,
      backgroundColor: theme.palette.background.default,
      [theme.breakpoints.down('md')]: {
        width: '60vw',
      },
      [theme.breakpoints.down('sm')]: {
        width: '90vw',
      },
    },
    closeIconContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      width: '100%',
    },
    closeIcon: {
      height: '7%',
    },
    logo: {
      width: '45%',
    },
    titleContainer: {
      margin: `${theme.spacing(4)}px ${theme.spacing(2)}px 0`,
    },
    descriptionContainer: {
      margin: `${theme.spacing(4)}px ${theme.spacing(3)}px 0`,
    },
  });

const AuthPanel = ({ classes }: WithStyles<typeof styles>) => {
  const { option, isOpen, setIsOpen } = useContext(AuthPanelContext);

  const closePanel = () => {
    setIsOpen(false);
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={closePanel}
      style={{ position: 'relative' }}
    >
      <div className={classes.container}>
        <div className={classes.closeIconContainer}>
          <Button onClick={closePanel}>
            <CloseIcon />
          </Button>
        </div>
        <img src={Logo} className={classes.logo} alt="logo" />
        <div className={classes.titleContainer}>
          <Typography variant="h4" color="textPrimary" align="center">
            {option.title}
          </Typography>
        </div>
        <div className={classes.descriptionContainer}>
          <Typography variant="body2" color="textPrimary" align="center">
            {option.description}
          </Typography>
        </div>
        {option.title === AUTH_PANEL_OPTIONS.CHECK.title ? (
          <CheckStatusPanel option={option} />
        ) : option.title === AUTH_PANEL_OPTIONS.LOGIN.title ? (
          <LoginPanel option={option} />
        ) : null}
      </div>
    </Drawer>
  );
};

export default memo(withStyles(styles)(AuthPanel));
