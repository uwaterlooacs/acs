import type { PositionDoc } from '@acs/shared';
import type { User } from 'types/user';

import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { UserContext } from 'context/user/state';
import Spacer from 'components/Spacer';
import { getUser } from 'utils/api/user';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: 300,
  },
  bottom: {
    display: 'flex',
    alignItems: 'center',
  },
}));

type Props = {
  position: PositionDoc;
};

const PositionInfo: React.FC<Props> = ({ position }) => {
  const classes = useStyles();

  const { title, description, isOpen } = position;

  const { token } = useContext(UserContext);

  const [occupant, setOccupant] = useState<User>();

  useEffect(() => {
    const fetchOccupant = async () => {
      if (position?.occupant && !occupant) {
        try {
          const user = await getUser(String(position.occupant), token);
          setOccupant(user);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      }
    };
    fetchOccupant();
  }, [occupant, position, token]);

  return (
    <div className={classes.container}>
      <Typography variant="h5">{title}</Typography>
      <Spacer height={4} />
      <Typography variant="body1">{description}</Typography>
      {isOpen && (
        <>
          <Spacer height={4} />
          <Typography variant="body1" color="primary">
            Position is open
          </Typography>
        </>
      )}
      {occupant && (
        <>
          <Spacer height={4} />
          <Typography>{`Occupant: ${occupant?.firstName} ${occupant?.lastName}`}</Typography>
        </>
      )}
    </div>
  );
};

export default PositionInfo;
