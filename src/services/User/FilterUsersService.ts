import { getCustomRepository, ILike } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { hash } from "bcryptjs"

interface IUserRequest {
  name?: string;
  email?: string;
  role?: string;
}

class FilterUsersService {
  async execute({name, email, role}: IUserRequest){
    const usersRepository = getCustomRepository(UsersRepositories);

    name = name === undefined ? ""  : name
    email = email === undefined ? "" : email
    role = role === undefined ? "" : role

    const users = await usersRepository.find({ 
      where: { 
        email: ILike("%"+email+"%"),
        name: ILike("%"+name+"%"),
        role: ILike("%"+role+"%"),
      }
    });

    return users;

  }
}

export { FilterUsersService }