import React from 'react';
import UserContextProvider from 'context/user/provider';
import ThemeContextProvider from 'context/theme/provider';
import ThemeProvider from 'theme/themeProvider';
import AuthPanelProvider from 'context/authPanel/provider';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Construction from 'pages/Construction';
import Membership from 'pages/Membership';
import { ROUTES } from 'utils/constants';

function App() {
  return (
    <UserContextProvider>
      <ThemeContextProvider>
        <ThemeProvider>
          <AuthPanelProvider>
            <BrowserRouter>
              <Switch>
                <Route exact path={ROUTES.HOME} component={Construction} />
                <Route path={ROUTES.MEMBERSHIP} component={Membership} />
              </Switch>
            </BrowserRouter>
          </AuthPanelProvider>
        </ThemeProvider>
      </ThemeContextProvider>
    </UserContextProvider>
  );
}

export default App;
