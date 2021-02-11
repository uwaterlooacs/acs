import type { PositionDoc } from '@acs/shared';

import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  CircularProgress,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import Search from '@material-ui/icons/Search';
import { UserContext } from 'context/user/state';
import Spacer from 'components/Spacer';
import { getUser, getUserByWatIAM } from 'utils/api/user';
import { User } from 'types/user';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
  },
  search: {
    display: 'flex',
    width: '100%',
  },
}));

type PositionStatus = 'Open' | 'Filled';

type Props = {
  position?: PositionDoc;
  saving: boolean;
  save: (position: Partial<PositionDoc>) => Promise<void>;
};

const PositionForm: React.FC<Props> = ({ position, saving, save }) => {
  const classes = useStyles();

  const { token } = useContext(UserContext);

  const [title, setTitle] = useState(position?.title ?? '');
  const [description, setDescription] = useState(position?.description ?? '');
  const [status, setStatus] = useState<PositionStatus>(
    position?.isOpen ? 'Open' : 'Filled',
  );
  const [occupantWatIAM, setOccupantWatIAM] = useState('');

  const [occupant, setOccupant] = useState<User>();

  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const fetchOccupant = async () => {
      if (position?.occupant && !occupant) {
        try {
          const user = await getUser(String(position.occupant), token);
          setOccupant(user);
          setOccupantWatIAM(user.watIAMUserId);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      }
    };
    fetchOccupant();
  }, [occupant, position, token]);

  const handleSearch = async () => {
    setSearching(true);
    try {
      const user = await getUserByWatIAM(occupantWatIAM, token);
      if (user) {
        setOccupant(user);
      }
    } catch (error) {
      setOccupantWatIAM('');
      // eslint-disable-next-line no-console
      console.error(error);
    }
    setSearching(false);
  };

  const handleSave = async () => {
    await save({
      id: position?._id,
      title,
      description,
      isOpen: status === 'Open',
      occupant: occupant?._id,
    });
  };

  return (
    <div className={classes.container}>
      <TextField
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        label="Title"
        placeholder="title"
      />
      <Spacer height={8} />
      <TextField
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        label="Description"
        placeholder="description"
        multiline
      />
      <Spacer height={8} />
      <FormControl component="fieldset">
        <FormLabel component="legend">Status</FormLabel>
        <RadioGroup
          value={status}
          onChange={(e) => setStatus(e.target.value as PositionStatus)}
        >
          <FormControlLabel value="Open" control={<Radio />} label="Open" />
          <FormControlLabel value="Filled" control={<Radio />} label="Filled" />
        </RadioGroup>
      </FormControl>
      <Spacer height={8} />
      <div className={classes.search}>
        <TextField
          value={occupantWatIAM}
          onChange={(e) => setOccupantWatIAM(e.target.value)}
          label="Occupant"
          placeholder="WatIAM username"
          fullWidth
        />
        <IconButton onClick={handleSearch}>
          {searching ? <CircularProgress /> : <Search />}
        </IconButton>
      </div>
      {occupant && (
        <>
          <Spacer height={8} />
          <Typography>{`Occupant: ${occupant.firstName} ${occupant.lastName}`}</Typography>
        </>
      )}
      <Spacer height={8} />
      <Button disabled={saving} onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default PositionForm;
