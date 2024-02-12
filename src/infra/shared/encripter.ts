import * as bcrypt from 'bcrypt';
import { EncripterAdapter } from 'src/application/adapters/encripter.adapter';

export class Encripter implements EncripterAdapter {
  async encript(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  async compare(password: string, critedPass: string): Promise<boolean> {
    return await bcrypt.compare(password, critedPass);
  }
}
