export interface UserPayload {
  sub: string;
  username: string;
  email: string;
  role: string;
  role_system: string;
  iat?: number;
  exp?: number;
}
