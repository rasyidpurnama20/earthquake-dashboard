export type AuthUserLoginResponse = {
  auth_token: string;
};

export type AuthUserDataResponse = {
  id: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  groups: any[];
  user_permissions: any[];
};
