import React from 'react';
import ThemeContextProvider from 'context/theme/provider';
import ThemeProvider from 'theme/themeProvider';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from 'pages/Home';
import Membership from 'pages/Membership';
import { ROUTES } from 'utils/constants';

function App() {
  return (
    <ThemeContextProvider>
      <ThemeProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path={ROUTES.HOME} component={Home} />
            <Route path={ROUTES.MEMBERSHIP} component={Membership} />
          </Switch>
        </BrowserRouter>
      </ThemeProvider>
    </ThemeContextProvider>
  );
}

export default App;
