import React, { useState } from 'react';
import { /*type*/ AuthPanelOption } from 'components/AuthPanel/types';
import Page from 'components/Page';
import { Button } from '@material-ui/core';
import AuthPanel from 'components/AuthPanel';
import { AUTH_PANEL_OPTIONS } from 'components/AuthPanel/constants';

function Membership() {
  const [authPanelOption, setAuthPanelOption] = useState<AuthPanelOption>(
    AUTH_PANEL_OPTIONS.LOGIN,
  );

  const [isAuthPanelOpen, setIsAuthPanelOpen] = useState(false);

  const openAuthPanel = (option: AuthPanelOption) => {
    setAuthPanelOption(option);
    setIsAuthPanelOpen(true);
  };

  return (
    <Page>
      <AuthPanel
        isOpen={isAuthPanelOpen}
        setIsOpen={setIsAuthPanelOpen}
        option={authPanelOption}
      />
      <Button onClick={() => openAuthPanel(AUTH_PANEL_OPTIONS.LOGIN)}>
        login
      </Button>
      <Button onClick={() => openAuthPanel(AUTH_PANEL_OPTIONS.RENEWAL)}>
        renew
      </Button>
      <Button onClick={() => openAuthPanel(AUTH_PANEL_OPTIONS.CHECK)}>
        check
      </Button>
    </Page>
  );
}

export default Membership;
