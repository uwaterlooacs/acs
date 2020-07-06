import { /*type*/ AuthPanelOption } from 'components/AuthPanel/types';

import React, { useContext } from 'react';
import Page from 'components/Page';
import { Button } from '@material-ui/core';
import { AUTH_PANEL_OPTIONS } from 'components/AuthPanel/constants';
import { AuthPanelContext } from 'context/authPanel/state';

function Membership() {
  const { setOption, setIsOpen } = useContext(AuthPanelContext);

  const openAuthPanel = (option: AuthPanelOption) => {
    setOption(option);
    setIsOpen(true);
  };

  return (
    <Page>
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
