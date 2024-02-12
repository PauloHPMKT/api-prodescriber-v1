export interface EncripterAdapter {
  encript(password: string): Promise<string>;
  compare(password: string, critedPass: string): Promise<boolean>;
}
