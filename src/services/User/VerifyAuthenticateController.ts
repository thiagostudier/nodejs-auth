import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../../repositories/UsersRepositories";
import { compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";
import { CustomError } from "../../util/CustomError"

interface IVerifyTokenRequest {
    token: string;
}

class VerifyAuthenticateController {
  async execute({token}: IVerifyTokenRequest){
    // VALIDAR TOKEN
    const status = verify(token, '107811f1ffc7ee3b816b136c71f54ecb', function(err, decodedToken) {
        return decodedToken ? decodedToken : err
    });
    // SE ESTIVER COM ERRO
    if(!status.sub){
        throw new CustomError("Token invalid!"); 
    }
    // PEGAR REPOSITÓRIO DOS USUÁRIOS
    const usersRepositories = getCustomRepository(UsersRepositories);
    // PEGAR USUÁRIO
    const user = await usersRepositories.findOne({
        where: {
            id: status.sub
        }
    });

    return user;

  }
}

export { VerifyAuthenticateController }