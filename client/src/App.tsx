import React from 'react';
import UserContextProvider from 'context/user/provider';
import ThemeContextProvider from 'context/theme/provider';
import ThemeProvider from 'theme/themeProvider';
import Page from 'components/Page';
import ThemeToggle from 'components/buttons/ThemeToggle';

function App() {
  return (
    <UserContextProvider>
      <ThemeContextProvider>
        <ThemeProvider>
          <Page>
            <ThemeToggle />
          </Page>
        </ThemeProvider>
      </ThemeContextProvider>
    </UserContextProvider>
  );
}

export default App;
