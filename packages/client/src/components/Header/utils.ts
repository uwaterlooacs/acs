import { MenuLink } from './types';
import { ROUTES } from 'utils/constants';
import { VOTING_STAGE } from '@acs/shared';

export const getMenuLinks = (
  votingStage: VOTING_STAGE,
  isAdmin?: boolean,
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
    votingStage !== VOTING_STAGE.Closed && {
      title: 'Voting',
      link: ROUTES.VOTING,
    },
    {
      title: 'Membership',
      link: ROUTES.MEMBERSHIP,
    },
    isAdmin && {
      title: 'Admin',
      link: ROUTES.ADMIN,
    },
  ].filter(Boolean) as MenuLink[];
};
