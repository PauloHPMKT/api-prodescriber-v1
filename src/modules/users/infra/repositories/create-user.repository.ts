import { UserModel } from '../../domain/models/user.model';

export interface CreateUserRepository {
  create(data: CreateUserUseCase.Params): Promise<CreateUserUseCase.Result>;
}

export namespace CreateUserUseCase {
  export type Params = UserModel.ToCreate;
  export type Result = {
    id: string;
  };
}
