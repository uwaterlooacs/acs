import { AuthPanelOption } from 'types/auth';

export type MembershipOption = {
  title: string;
  description: string;
  cta: string;
  authPanelOption?: AuthPanelOption;
};
