import type { PositionDoc } from '@acs/shared';

import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Divider, Typography } from '@material-ui/core';
import { getPositions } from 'utils/api/position';
import Spacer from 'components/Spacer';
import OpenPosition from 'components/OpenPosition';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    padding: `0 ${spacing(4)}px`,
  },
}));

const Nomination: React.FC = () => {
  const classes = useStyles();

  const [positions, setPositions] = useState<PositionDoc[]>([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        setPositions(
          (await getPositions()).filter((position) => position.isOpen),
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
    fetchPositions();
  }, []);

  return (
    <div className={classes.container}>
      <Typography variant="h4">Open Positions</Typography>
      {positions.map((position) => (
        <div key={position._id}>
          <Spacer width={16} />
          <OpenPosition position={position} />
          <Spacer height={16} />
          <Divider />
        </div>
      ))}
    </div>
  );
};

export default Nomination;
