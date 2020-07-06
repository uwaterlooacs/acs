import React, { memo, useState } from 'react';
import { /*type*/ Dispatch, SetStateAction } from 'react';
import { /*type*/ WithStyles, Theme } from '@material-ui/core/styles';
import { /*type*/ AuthPanelOption } from './types';
import { withStyles, createStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { Typography, Button, TextField, Drawer } from '@material-ui/core';
import { AUTH_PANEL_OPTIONS } from './constants';
import BWButton from 'components/buttons/BWButton';

const styles = (theme: Theme) =>
  createStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      width: '30vw',
      backgroundColor: theme.palette.background.default,
      [theme.breakpoints.down('sm')]: {
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
    inputContainer: {
      marginTop: theme.spacing(4),
      width: '90%',
    },
    textField: {
      height: '5%',
      width: '100%',
    },
    button: {
      height: '100%',
      width: '100%',
    },
    membershipStatusContainer: {
      marginTop: theme.spacing(4),
    },
    helperButton: {
      textTransform: 'none',
      marginTop: theme.spacing(2),
    },
  });

interface Props extends WithStyles<typeof styles> {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  option?: AuthPanelOption;
}

const AuthPanel = ({
  classes,
  isOpen,
  setIsOpen,
  option = AUTH_PANEL_OPTIONS.LOGIN,
}: Props) => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [membershipStatus, setMembershipStatus] = useState('');

  const submit = () => {
    // replace with api calls
    if (option.title === AUTH_PANEL_OPTIONS.CHECK.title) {
      setMembershipStatus('Full Member');
    }
  };

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={() => setIsOpen(false)}
      style={{ position: 'relative' }}
    >
      <div className={classes.container}>
        <div className={classes.closeIconContainer}>
          <Button onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </Button>
        </div>
        <img
          src="assets/ACSLogoColour.png"
          className={classes.logo}
          alt="logo"
        />
        <div className={classes.titleContainer}>
          <Typography variant="h4" color="textPrimary" align="center">
            {option.title}
          </Typography>
        </div>
        {option.description && (
          <div className={classes.descriptionContainer}>
            <Typography variant="body2" color="textPrimary" align="center">
              {option.description}
            </Typography>
          </div>
        )}
        <div className={classes.inputContainer}>
          <TextField
            label="Email Address / WatIAM Username"
            value={id}
            onChange={(e) => setId(e.target.value)}
            type="text"
            variant="outlined"
            className={classes.textField}
          />
        </div>
        {option.title !== AUTH_PANEL_OPTIONS.CHECK.title && (
          <div className={classes.inputContainer}>
            <TextField
              label="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              variant="outlined"
              className={classes.textField}
            />
          </div>
        )}
        <div className={classes.inputContainer}>
          <BWButton className={classes.button} onClick={submit}>
            {option.submit}
          </BWButton>
        </div>
        {membershipStatus && option.title === AUTH_PANEL_OPTIONS.CHECK.title && (
          <div className={classes.membershipStatusContainer}>
            <Typography variant="body2" align="center" color="textPrimary">
              You are:
            </Typography>
            <Typography variant="h5" align="center" color="textPrimary">
              {membershipStatus}
            </Typography>
          </div>
        )}
        {option.title !== AUTH_PANEL_OPTIONS.CHECK.title && (
          <>
            <Button className={classes.helperButton}>
              <Typography variant="body2" align="center" color="textSecondary">
                Forgot Password?
              </Typography>
            </Button>
            <Button className={classes.helperButton}>
              <Typography variant="body2" align="center" color="textSecondary">
                Never been a member before?
              </Typography>
            </Button>
          </>
        )}
        {option.title === AUTH_PANEL_OPTIONS.LOGIN.title && (
          <Button className={classes.helperButton}>
            <Typography variant="body2" align="center" color="textSecondary">
              Member in a previous term and want to renew?
            </Typography>
          </Button>
        )}
      </div>
    </Drawer>
  );
};

export default memo(withStyles(styles)(AuthPanel));
