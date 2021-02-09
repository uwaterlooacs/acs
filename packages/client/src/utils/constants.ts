export enum ROUTES {
  LANDING = '/',
  HOME = '/home',
  MEMBERSHIP = '/membership',
  EVENTS = '/events',
  VOTING = '/voting',
  ADMIN = '/admin',
}

export const AUTH_PANEL_OPTIONS = {
  LOGIN: {
    title: 'Member Login',
    description: '',
    submit: 'Submit',
  },
  RENEWAL: {
    title: 'Membership Renewal',
    description:
      'Enter the login information that you used to create an account the last term that you were a member',
    submit: 'Submit',
  },
  CHECK: {
    title: 'Membership Check',
    description: '',
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
