import type { PositionDoc } from '@acs/shared';

import React, { useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress, IconButton } from '@material-ui/core';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { UserContext } from 'context/user/state';
import { deletePosition, updatePosition } from 'utils/api/position';
import Form from './Form';
import Info from './Info';

const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
  },
}));

type Props = {
  position: PositionDoc;
  remove: (positionId: string) => void;
  update: (position: PositionDoc) => void;
};

const PositionRow: React.FC<Props> = ({ position, remove, update }) => {
  const classes = useStyles();

  const { token } = useContext(UserContext);

  const [canEdit, setCanEdit] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleEdit = () => {
    setCanEdit(!canEdit);
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await deletePosition(position._id, token);
      remove(position._id);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    setDeleting(false);
  };

  const save = async (partialPosition: Partial<PositionDoc>) => {
    setSaving(true);
    try {
      await updatePosition(partialPosition, token);
      update({
        ...position,
        ...partialPosition,
      } as PositionDoc);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
    setCanEdit(false);
    setSaving(false);
  };

  return (
    <div className={classes.container}>
      {canEdit ? (
        <Form position={position} saving={saving} save={save} />
      ) : (
        <Info position={position} />
      )}
      {!canEdit && (
        <div className={classes.container}>
          <IconButton onClick={handleEdit}>
            <Edit />
          </IconButton>
          <IconButton disabled={deleting} onClick={handleDelete}>
            {deleting ? <CircularProgress /> : <Delete />}
          </IconButton>
        </div>
      )}
    </div>
  );
};

export default PositionRow;
