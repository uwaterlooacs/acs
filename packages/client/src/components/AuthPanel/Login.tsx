import type { AuthPanelOption } from 'types/auth';

import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Button, TextField, Typography } from '@material-ui/core';
import { AuthPanelContext } from 'context/authPanel/state';
import { UserContext } from 'context/user/state';
import BWButton from 'components/buttons/BWButton';
import Spacer from 'components/Spacer';
import { ROUTES } from 'utils/constants';
import { login } from 'utils/api/user';

const useStyles = makeStyles(({ spacing, palette }) => ({
  container: {
    marginTop: spacing(1),
    borderColor: palette.text.secondary,
  },
  inputContainer: {
    marginTop: spacing(4),
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
    marginTop: spacing(4),
    width: '90%',
  },
  helperButton: {
    textTransform: 'none',
    marginTop: spacing(2),
  },
  errorContainer: {
    marginTop: spacing(2),
  },
}));

type Props = {
  option: AuthPanelOption;
};

const LoginPanel: React.FC<Props> = ({ option }) => {
  const classes = useStyles();

  const { setIsOpen } = useContext(AuthPanelContext);
  const { setUser, setToken } = useContext(UserContext);

  const history = useHistory();

  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const clearError = () => {
    if (error) setError('');
  };

  const closePanel = () => {
    clearError();
    setIsOpen(false);
  };

  const submit = async () => {
    try {
      const { user, token } = await login({ id, password });
      setUser(user);
      setToken(token);
      clearError();
      closePanel();
    } catch (error) {
      setError('Unable to log in with those credentials');
    }
  };

  const handleNeverBeenAMember = () => {
    closePanel();
    history.push(`${ROUTES.MEMBERSHIP}/howtojoin`);
  };

  return (
    <>
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
      {error && (
        <div>
          <Spacer height={16} />
          <Typography variant="body2" align="center" color="error">
            {error}
          </Typography>
        </div>
      )}
      <div className={classes.inputContainer}>
        <BWButton className={classes.button} onClick={submit}>
          {option.submit}
        </BWButton>
      </div>
      <Button className={classes.helperButton} onClick={handleNeverBeenAMember}>
        <Typography variant="body2" align="center" color="textSecondary">
          Never been a member before?
        </Typography>
      </Button>
    </>
  );
};

export default LoginPanel;
