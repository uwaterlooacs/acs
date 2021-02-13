import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { UserContext } from 'context/user/state';
import { logout } from 'utils/api/user';
import { ROUTES } from 'utils/constants';

const LogoutPage: React.FC = () => {
  const { token, unsetToken, unsetUser } = useContext(UserContext);
  useEffect(() => {
    (async () => {
      try {
        await logout(token);
        unsetToken();
        unsetUser();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    })();
    // eslint-disable-next-line
  }, []);

  return <Redirect to={ROUTES.LANDING} />;
};

export default LogoutPage;
