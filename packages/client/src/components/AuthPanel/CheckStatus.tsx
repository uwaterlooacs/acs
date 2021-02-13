import type { AuthPanelOption } from 'types/auth';

import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Typography } from '@material-ui/core';
import { UserContext } from 'context/user/state';
import BWButton from 'components/buttons/BWButton';
import Spacer from 'components/Spacer';
import { getMembershipStatus } from 'utils/api/membership';

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

const CheckStatusPanel: React.FC<Props> = ({ option }) => {
  const classes = useStyles();

  const { user } = useContext(UserContext);

  const [watIAM, setWatIAM] = useState(user ? user.watIAMUserId : '');
  const [membershipStatus, setMembershipStatus] = useState(
    user ? user.membershipStatus : '',
  );
  const [error, setError] = useState('');

  const clearError = () => {
    if (error) setError('');
  };

  const submit = async () => {
    try {
      setMembershipStatus(await getMembershipStatus(watIAM));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <>
      <div className={classes.inputContainer}>
        <TextField
          label="WatIAM Username"
          value={watIAM}
          onChange={(e) => {
            clearError();
            setWatIAM(e.target.value);
          }}
          type="text"
          variant="outlined"
          className={classes.textField}
        />
      </div>
      {error && (
        <>
          <Spacer height={8} />
          <Typography variant="body2" align="center" color="error">
            {error}
          </Typography>
        </>
      )}
      <div className={classes.inputContainer}>
        <BWButton className={classes.button} onClick={submit}>
          {option.submit}
        </BWButton>
      </div>
      {membershipStatus && (
        <div className={classes.membershipStatusContainer}>
          <Typography variant="h5" align="center" color="textPrimary">
            {membershipStatus}
          </Typography>
        </div>
      )}
    </>
  );
};

export default CheckStatusPanel;
