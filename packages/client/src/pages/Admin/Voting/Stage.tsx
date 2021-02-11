import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Select,
  MenuItem,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { VOTING_STAGE } from '@acs/shared';
import { UserContext } from 'context/user/state';
import { VotingContext } from 'context/voting/state';
import Spacer from 'components/Spacer';
import { updateVotingStage } from 'utils/api/voting';

const useStyles = makeStyles({
  select: {
    width: 200,
  },
});

const Stage: React.FC = () => {
  const classes = useStyles();

  const { token } = useContext(UserContext);
  const { stage, setStage } = useContext(VotingContext);

  const [localStage, setLocalStage] = useState(stage);
  const [loading, setLoading] = useState(false);

  const handleSelectChange = (
    e: React.ChangeEvent<{
      value: unknown;
    }>,
  ) => {
    setLocalStage(e.target.value as VOTING_STAGE);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateVotingStage(localStage, token);
      setStage(localStage);
      alert(`Voting stage updated to ${localStage}`);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <>
      <Typography variant="h4">Stage</Typography>
      <Spacer height={8} />
      <Select
        className={classes.select}
        value={localStage}
        onChange={handleSelectChange}
      >
        <MenuItem value={VOTING_STAGE.Closed}>{VOTING_STAGE.Closed}</MenuItem>
        <MenuItem value={VOTING_STAGE.Nomination}>
          {VOTING_STAGE.Nomination}
        </MenuItem>
        <MenuItem value={VOTING_STAGE.Vote}>{VOTING_STAGE.Vote}</MenuItem>
        <MenuItem value={VOTING_STAGE.Results}>{VOTING_STAGE.Results}</MenuItem>
      </Select>
      <Spacer height={8} />
      <Button onClick={handleSave}>Save</Button>
      <Spacer height={8} />
      {loading && <CircularProgress />}
    </>
  );
};

export default Stage;
