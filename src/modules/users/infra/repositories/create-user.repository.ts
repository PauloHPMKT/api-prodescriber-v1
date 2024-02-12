export interface CreateUserRepository {
  create(data: any): Promise<string>;
}
