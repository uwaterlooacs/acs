import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ThemeProvider from 'theme/themeProvider';
import UserContextProvider from 'context/user/provider';
import ThemeContextProvider from 'context/theme/provider';
import AuthPanelContextProvider from 'context/authPanel/provider';
import VotingContextProvider from 'context/voting/provider';
import Home from 'pages/Home';
import Events from 'pages/Events';
import Voting from 'pages/Voting';
import Membership from 'pages/Membership';
import Admin from 'pages/Admin';
import Construction from 'pages/Construction';
import { ROUTES } from 'utils/constants';

const App: React.FC = () => {
  return (
    <UserContextProvider>
      <ThemeContextProvider>
        <ThemeProvider>
          <VotingContextProvider>
            <AuthPanelContextProvider>
              <BrowserRouter>
                <Switch>
                  <Route exact path={ROUTES.LANDING} component={Construction} />
                  <Route exact path={ROUTES.HOME} component={Home} />
                  <Route path={ROUTES.EVENTS} component={Events} />
                  <Route path={ROUTES.VOTING} component={Voting} />
                  <Route path={ROUTES.MEMBERSHIP} component={Membership} />
                  <Route path={ROUTES.ADMIN} component={Admin} />
                </Switch>
              </BrowserRouter>
            </AuthPanelContextProvider>
          </VotingContextProvider>
        </ThemeProvider>
      </ThemeContextProvider>
    </UserContextProvider>
  );
};

export default App;
