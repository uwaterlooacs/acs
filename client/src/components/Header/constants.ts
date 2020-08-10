import { MenuLink } from './types';
import { ROUTES } from 'utils/constants';

export const MENU_LINKS: MenuLink[] = [
  {
    title: 'Home',
    link: ROUTES.HOME,
  },
  {
    title: 'Events',
    link: ROUTES.EVENTS,
  },
  {
    title: 'Voting',
    link: ROUTES.VOTING,
  },
  {
    title: 'Membership',
    link: ROUTES.MEMBERSHIP,
  },
];
