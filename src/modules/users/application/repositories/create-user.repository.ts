import { UserModel } from '../../domain/models/user.model';

export interface CreateUserRepository {
  create(data: CreateUserUseCase.Params): Promise<string>;
}

export namespace CreateUserUseCase {
  export type Params = UserModel.ToCreate;
}
