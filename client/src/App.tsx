import React from 'react';
import ThemeContextProvider from 'context/theme/provider';
import ThemeProvider from 'theme/themeProvider';
import Page from 'components/Page';
import ThemeToggle from 'components/buttons/ThemeToggle';

function App() {
  return (
    <ThemeContextProvider>
      <ThemeProvider>
        <Page>
          <ThemeToggle />
        </Page>
      </ThemeProvider>
    </ThemeContextProvider>
  );
}

export default App;
