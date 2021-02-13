import type { PositionDoc } from '@acs/shared';
import type { User } from 'types/user';

import React, { useContext, useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import { UserContext } from 'context/user/state';
import Spacer from 'components/Spacer';
import { getUser } from 'utils/api/user';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    marginTop: spacing(1),
  },
}));

type Props = {
  position: PositionDoc;
};

const PositionDetails: React.FC<Props> = ({ position }) => {
  const classes = useStyles();

  const { token } = useContext(UserContext);

  const [occupant, setOccupant] = useState<User>();

  useEffect(() => {
    (async () => {
      try {
        if (position.occupant) {
          setOccupant(await getUser(position.occupant.toString(), token));
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();
  }, [position.occupant, token]);

  if (!occupant) {
    return null;
  }

  const { firstName, lastName, semester, faculty } = occupant;

  return (
    <div className={classes.container}>
      <Typography variant="h4">{position.title}</Typography>
      <Typography variant="h5">{`${firstName} ${lastName}`}</Typography>
      <Spacer height={4} />
      <Typography variant="overline" color="textSecondary" gutterBottom>
        {semester} {faculty}
      </Typography>
    </div>
  );
};

export default PositionDetails;
