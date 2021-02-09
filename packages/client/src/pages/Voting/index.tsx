import React, { useContext } from 'react';
import { VOTING_STAGE } from '@acs/shared';
import { VotingContext } from 'context/voting/state';
import Page from 'components/Page';
import Nomination from './Nomination';
import Voting from './Voting';

const VotingPage: React.FC = () => {
  const { stage } = useContext(VotingContext);
  return (
    <Page>
      {stage === VOTING_STAGE.Nomination ? (
        <Nomination />
      ) : stage === VOTING_STAGE.Vote ? (
        <Voting />
      ) : null}
    </Page>
  );
};

export default VotingPage;
