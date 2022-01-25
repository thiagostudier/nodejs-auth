import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { hash } from "bcryptjs"

interface IUserRequest {
  id: string;
  name?: string;
  email?: string;
  role?: string;
  photo?: string;
  password?: string;
}

class UpdateUsersService {
  async execute({id, name, email, role, photo, password}: IUserRequest){
    const usersRepository = getCustomRepository(UsersRepositories);
    
    // PEGAR USUARIO
    let user = await usersRepository.findOne(id);

    // ATUALIZAR DADOS
    user.name = name != null ? name : user.name
    user.email = email != null ? email : user.email
    user.role = role != null ? role : user.role
    user.photo = photo != null ? photo : user.photo
    user.password = password != null ? await hash(password, 8) : user.password

    await usersRepository.save(user);

    return user;

  }
}

export { UpdateUsersService }