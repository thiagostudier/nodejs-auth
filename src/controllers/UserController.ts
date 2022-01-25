import { Request, Response } from "express";
import { CreateUserService } from "../services/User/CreateUserService"
import { ListUsersService } from "../services/User/ListUsersService"
import { GetUsersService } from "../services/User/GetUsersService"
import { FilterUsersService } from "../services/User/FilterUsersService"
import { UpdateUsersService } from "../services/User/UpdateUsersService"
import { AuthenticateUserController } from "../services/User/AuthenticateUserController"
import { VerifyAuthenticateController } from "../services/User/VerifyAuthenticateController"

class UserController {

  async store(request: Request, response: Response) {
    const { name, email, role, photo, password } = request.body;
    const createUserService = new CreateUserService();
    const user = await createUserService.execute({name, email, role, photo, password});
    return response.status(200).json(user);  
  }

  async all(request: Request, response: Response) {
    const listUsersService = new ListUsersService();
    const users = await listUsersService.execute();
    return response.json(users);
  }

  async get(request: Request, response: Response) {
    const { id } = request.params;
    const getUsersService = new GetUsersService();
    const user = await getUsersService.execute({id});
    return response.json(user);
  }

  async filter(request: Request, response: Response) {
    const { name, email, role } = request.body;
    const filterUsersService = new FilterUsersService();
    const user = await filterUsersService.execute({name, email, role});
    return response.status(200).json(user);  
  }

  async update(request: Request, response: Response) {
    const { id } = request.params
    const { name, email, role, photo, password } = request.body;
    const updateUsersService = new UpdateUsersService();
    const user = await updateUsersService.execute({id, name, email, role, photo, password});
    return response.status(200).json(user);  
  }

  async login(request: Request, response: Response) {
    const { email, password } = request.body;
    const authenticateUserService = new AuthenticateUserController();
    const token = await authenticateUserService.execute({email, password});
    return response.status(200).json(token);  
  }

  async me(request: Request, response: Response) {
    const { token } = request.body;
    const verifyAuthenticateController = new VerifyAuthenticateController();
    const status = await verifyAuthenticateController.execute({token});
    return response.status(200).json(status);  
  }

}

export { UserController }