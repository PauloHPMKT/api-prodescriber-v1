export interface UserPayload {
  sub: string;
  username: string;
  email: string;
  plan: string;
  role_system: string;
  iat?: number;
  exp?: number;
}
