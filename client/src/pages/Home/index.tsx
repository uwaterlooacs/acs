import React, { useState } from 'react';
import Page from 'components/Page';
import MailingList from 'components/forms/MailingList';

function Home() {
  const [isAuthPanelOpen, setIsAuthPanelOpen] = useState(false);

  return (
    <Page
      isAuthPanelOpen={isAuthPanelOpen}
      setIsAuthPanelOpen={setIsAuthPanelOpen}
    >
      <MailingList />
    </Page>
  );
}

export default Home;
