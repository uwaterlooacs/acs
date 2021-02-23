import { MenuLink } from './types';
import { ROUTES } from 'utils/constants';
import { VOTING_STAGE } from '@acs/shared';
import { User } from 'types/user';

export const getMenuLinks = (
  votingStage: VOTING_STAGE,
  user?: User,
): MenuLink[] => {
  return [
    {
      title: 'Home',
      link: ROUTES.HOME,
    },
    {
      title: 'Events',
      link: ROUTES.EVENTS,
    },
    votingStage !== VOTING_STAGE.Closed &&
      user && {
        title: 'Voting',
        link: ROUTES.VOTING,
      },
    {
      title: 'Membership',
      link: ROUTES.MEMBERSHIP,
    },
    user?.isAdmin && {
      title: 'Admin',
      link: ROUTES.ADMIN,
    },
    user && {
      title: 'Logout',
      link: ROUTES.LOGOUT,
    },
  ].filter(Boolean) as MenuLink[];
};
