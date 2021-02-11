import type { PositionDoc } from '@acs/shared';

import React, { useContext, useEffect, useState } from 'react';
import { createPosition, getPositions } from 'utils/api/position';
import { Button, Divider, Typography } from '@material-ui/core';
import { UserContext } from 'context/user/state';
import PositionRow from 'components/PositionRow';
import Form from 'components/PositionRow/Form';
import Spacer from 'components/Spacer';

const Positions: React.FC = () => {
  const { token } = useContext(UserContext);

  const [positions, setPositions] = useState<PositionDoc[]>([]);

  const [creating, setCreating] = useState(false);
  const [saving, setSaving] = useState(false);

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
  });

  const save = async (position: Partial<PositionDoc>) => {
    setSaving(true);
    try {
      await createPosition(position, token);
      setCreating(false);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    setSaving(false);
  };

  const remove = (positionId: string) => {
    setPositions(positions.filter((position) => position._id !== positionId));
  };

  const udpate = (position: PositionDoc) => {
    const index = positions.findIndex((p) => p._id === position._id);
    if (index >= 0) {
      setPositions([
        ...positions.slice(0, index),
        position,
        ...positions.slice(index + 1, positions.length),
      ]);
    }
  };

  return (
    <>
      <Typography variant="h4">Positions</Typography>
      <Spacer height={8} />
      <Button disabled={creating} onClick={() => setCreating(!creating)}>
        Create
      </Button>
      {creating && <Form saving={saving} save={save} />}
      {positions.map((position) => (
        <div key={position._id}>
          <Spacer height={8} />
          <PositionRow position={position} remove={remove} update={udpate} />
          <Spacer height={8} />
          <Divider />
        </div>
      ))}
    </>
  );
};

export default Positions;
