import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ThemeProvider from 'theme/themeProvider';
import UserContextProvider from 'context/user/provider';
import ThemeContextProvider from 'context/theme/provider';
import AuthPanelProvider from 'context/authPanel/provider';
import Home from 'pages/Home';
import Membership from 'pages/Membership';
import MailingList from 'pages/MailingList';
import { ROUTES } from 'utils/constants';

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <ThemeContextProvider>
        <ThemeProvider>
          <AuthPanelProvider>
            <BrowserRouter>
              <Switch>
                <Route exact path={ROUTES.LANDING} component={MailingList} />
                <Route exact path={ROUTES.HOME} component={Home} />
                <Route path={ROUTES.MEMBERSHIP} component={Membership} />
              </Switch>
            </BrowserRouter>
          </AuthPanelProvider>
        </ThemeProvider>
      </ThemeContextProvider>
    </UserContextProvider>
  );
};

export default App;
