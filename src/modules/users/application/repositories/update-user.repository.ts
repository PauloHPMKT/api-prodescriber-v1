import { UpdateUserDto } from '../../presentation/dtos/update-user.dto';

export interface UpdateUserRepository {
  update(id: string, data: UpdateUserDto): Promise<string>;
}
