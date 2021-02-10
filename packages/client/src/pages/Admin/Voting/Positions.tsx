import type { PositionDoc } from '@acs/shared';

import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { getPositions } from 'utils/api/position';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
  container: {
    marginTop: spacing(1),
  },
}));

const Positions: React.FC = () => {
  const classes = useStyles();
  void classes;

  const [positions, setPositions] = useState<PositionDoc[]>([]);

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const fetchedPositions = await getPositions();
        if (positions.length !== fetchedPositions.length) {
          setPositions(fetchedPositions);
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };
    fetchPositions();
  }, [positions]);

  return (
    <>
      <Typography variant="h4">Positions</Typography>
      <br />
    </>
  );
};

export default Positions;
