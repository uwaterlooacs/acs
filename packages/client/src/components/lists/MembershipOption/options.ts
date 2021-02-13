import { AUTH_PANEL_OPTIONS } from 'utils/constants';

export default [
  {
    title: 'Yes I am!',
    description: 'If you have signed up for membership this term already',
    cta: 'LOGIN',
    authPanelOption: AUTH_PANEL_OPTIONS.LOGIN,
  },
  {
    title: 'I have been',
    description: 'If you have signed up for membership in a previous term',
    cta: 'RENEW MEMBERSHIP',
  },
  {
    title: 'Not sure',
    description:
      "If you aren't sure whether you've signed up for membership or not",
    cta: 'CHECK MY STATUS',
    authPanelOption: AUTH_PANEL_OPTIONS.CHECK,
  },
  {
    title: 'Not yet',
    description: 'If you have never been a member before',
    cta: 'SIGN UP',
  },
];
