import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { hash } from "bcryptjs"

interface IUserRequest {
  name: string;
  email: string;
  role?: string;
  photo?: string;
  password: string;
}

class CreateUserService {
  async execute({name, email, role, photo, password}: IUserRequest){
    const usersRepository = getCustomRepository(UsersRepositories);
    // VERIFICAR SE OS DADOS OBRIGATÓRIOS FORAM INSERIDOS
    if(!name || !email || !password){
      throw new Error("Data incorrect");
    }
    // VERIFICAR SE O USUÁRIO JÁ EXISTE
    const userAlreadyExists = await usersRepository.findOne({email});
    if(userAlreadyExists){
      throw new Error("User already exists");
    }
    // CRIAR HASH DE SENHA 
    const passwordHash = await hash(password, 8)
    
    const user = usersRepository.create({name, email, role, photo, password: passwordHash});

    await usersRepository.save(user);

    return user;

  }
}

export { CreateUserService }