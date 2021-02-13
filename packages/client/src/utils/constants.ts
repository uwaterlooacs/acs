export enum ROUTES {
  LANDING = '/',
  HOME = '/home',
  MEMBERSHIP = '/membership',
  EVENTS = '/events',
  VOTING = '/voting',
  ADMIN = '/admin',
  LOGOUT = '/logout',
}

export const AUTH_PANEL_OPTIONS = {
  LOGIN: {
    title: 'Member Login',
    description: 'Login using your email or WatIAM username',
    submit: 'Submit',
  },
  CHECK: {
    title: 'Membership Check',
    description:
      "Use your WatIAM username to determine whether or not you're a member",
    submit: 'Check My Status',
  },
};

export const FACULTIES = [
  'Applied Health Sciences',
  'Arts',
  'Engineering',
  'Environment',
  'Mathematics',
  'Science',
];

export const SEMESTERS = [
  '1A',
  '1B',
  '2A',
  '2B',
  '3A',
  '3B',
  '4A',
  '4B',
  '5A',
  '5B',
  'co-op',
];
