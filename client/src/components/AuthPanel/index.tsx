import type { WithStyles, Theme } from '@material-ui/core/styles';

import React, { memo, useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles, createStyles } from '@material-ui/core/styles';
import { Typography, Button, TextField, Drawer, Box } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { AuthPanelContext } from 'context/authPanel/state';
import { UserContext } from 'context/user/state';
import { AUTH_PANEL_OPTIONS } from 'utils/constants';
import BWButton from 'components/buttons/BWButton';
import { login } from 'utils/api/user';
import { getMembershipStatus, renewMembership } from 'utils/api/membership';

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
      width: '90%',
    },
    helperButton: {
      textTransform: 'none',
      marginTop: theme.spacing(2),
    },
  });

const AuthPanel = ({ classes }: WithStyles<typeof styles>) => {
  const history = useHistory();
  const { option, isOpen, setIsOpen, setOption } = useContext(AuthPanelContext);
  const { setUser, setToken, token, user } = useContext(UserContext);
  const authenticated = user._id !== '0';

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [membershipStatus, setMembershipStatus] = useState('');
  const [error, setError] = useState('');

  const clearError = () => {
    if (error) setError('');
  };

  const closePanel = () => {
    clearError();
    setIsOpen(false);
  };

  const submit = async () => {
    switch (option.title) {
      case AUTH_PANEL_OPTIONS.LOGIN.title:
        try {
          const { user, token } = await login({ id, password });
          setUser(user);
          setToken(token);
          clearError();
          closePanel();
        } catch (err) {
          const error = err as Error;
          setError(error.message);
        }
        break;
      case AUTH_PANEL_OPTIONS.RENEWAL.title:
        try {
          if (!authenticated) {
            setOption(AUTH_PANEL_OPTIONS.LOGIN);
            setError("We couldn't renew your membership. Try logging in above");
          } else {
            await renewMembership(token);
            closePanel();
            history.push('/membership/verifyinfo');
          }
        } catch (err) {
          const error = err as Error;
          setError(error.message);
        }
        break;
      case AUTH_PANEL_OPTIONS.CHECK.title:
        try {
          setMembershipStatus(await getMembershipStatus(id));
        } catch (err) {
          const error = err as Error;
          setError(error.message);
        }
        break;
    }
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
            onChange={(e) => {
              clearError();
              setId(e.target.value);
            }}
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
              onChange={(e) => {
                clearError();
                setPassword(e.target.value);
              }}
              type="password"
              variant="outlined"
              className={classes.textField}
            />
          </div>
        )}
        {error && (
          <Box marginTop={2}>
            <Typography variant="body2" align="center" color="error">
              {error}
            </Typography>
          </Box>
        )}
        <div className={classes.inputContainer}>
          <BWButton className={classes.button} onClick={submit}>
            {option.submit}
          </BWButton>
        </div>
        {membershipStatus && option.title === AUTH_PANEL_OPTIONS.CHECK.title && (
          <div className={classes.membershipStatusContainer}>
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
