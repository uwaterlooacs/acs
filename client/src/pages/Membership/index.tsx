import React from 'react';
import Page from 'components/Page';
import ShrinkImage from 'components/ShrinkImage';
import MembershipOptionsList from 'components/lists/MembershipOption';
import AreYouAMember from './AreYouAMember.png';

function Membership() {
  return (
    <Page>
      <ShrinkImage shift src={AreYouAMember} alt="Are you a member?" />
      <MembershipOptionsList />
    </Page>
  );
}

export default Membership;
