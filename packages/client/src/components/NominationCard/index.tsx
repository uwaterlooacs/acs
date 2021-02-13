import type { User } from 'types/user';
import { NominationDoc, VOTING_STAGE } from '@acs/shared';

import React, { useState, useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from 'context/user/state';
import { VotingContext } from 'context/voting/state';
import { getUser } from 'utils/api/user';
import Card from './Card';
import {
  deleteNomination,
  secondNomination,
  voteNomination,
} from 'utils/api/nomination';
import { hasCompletedAction } from './utils';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
  container: {
    width: 300,
    [breakpoints.down('md')]: {
      width: `calc(100vw - ${2 * spacing(4)}px)`,
    },
  },
}));

type Props = {
  nomination: NominationDoc;
  removeFromList: (nomination: NominationDoc) => void;
};

const NominationCard: React.FC<Props> = ({ nomination, removeFromList }) => {
  const classes = useStyles();

  const { user, token } = useContext(UserContext);
  const { stage } = useContext(VotingContext);

  const [nominee, setNominee] = useState<User>();
  const [completedAction, setCompletedAction] = useState(
    hasCompletedAction(nomination, stage, user),
  );

  useEffect(() => {
    const fetchNominee = async () => {
      try {
        setNominee(await getUser(String(nomination.candidate), token));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };
    fetchNominee();
  }, [nomination.candidate, token]);

  if (!nominee) {
    return null;
  }

  const isMyNomination = nomination.candidate === user?._id;

  const second = async () => {
    try {
      await secondNomination(nomination._id, token);
      setCompletedAction(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const vote = async () => {
    try {
      await voteNomination(nomination._id, token);
      setCompletedAction(true);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const handleClick = async () => {
    switch (stage) {
      case VOTING_STAGE.Nomination:
        await second();
        break;
      case VOTING_STAGE.Vote:
        await vote();
        break;
      default:
        break;
    }
  };

  const handleDelete = isMyNomination
    ? async () => {
        try {
          await deleteNomination(nomination._id, token);
          removeFromList(nomination);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      }
    : undefined;

  return (
    <div className={classes.container}>
      <Card
        {...nominee}
        {...nomination}
        stage={stage}
        isDisabled={isMyNomination || completedAction}
        handleClick={handleClick}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default NominationCard;
