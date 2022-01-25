import { getCustomRepository } from "typeorm"
import { UsersRepositories } from "../../repositories/UsersRepositories"
import { classToPlain } from "class-transformer"

interface IUserRequest {
  id: string;
}

class GetUsersService {
  async execute({id}: IUserRequest){
    const usersRepositories = getCustomRepository(UsersRepositories);
    const user = await usersRepositories.findOne({
      where: {
        id: id
      }
    });
    return classToPlain(user);
  }
}

export { GetUsersService }