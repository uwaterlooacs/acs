import type { User } from 'types/user';
import { NominationDoc, VOTING_STAGE } from '@acs/shared';

import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from 'context/user/state';
import { VotingContext } from 'context/voting/state';
import { getUser } from 'utils/api/user';
import Card from './Card';

type Props = {
  nomination: NominationDoc;
};

const NominationCard: React.FC<Props> = ({ nomination }) => {
  const { token } = useContext(UserContext);
  const { stage } = useContext(VotingContext);

  const [nominee, setNominee] = useState<User>();

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

  const second = async () => null;

  const vote = async () => null;

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

  if (!nominee) {
    return null;
  }

  return (
    <Card
      {...nominee}
      stage={stage}
      isDisabled={false}
      handleClick={handleClick}
    />
  );
};

export default NominationCard;
