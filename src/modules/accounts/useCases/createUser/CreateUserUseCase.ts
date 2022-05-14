import {IUsersRepository} from "../../repositories/IUsersRepository";
import {inject, injectable} from "tsyringe";
import {ICreateUsersDTO} from "../../dtos/ICreateUsersDTO";
import {hash} from "bcryptjs";
import {AppErrors} from "../../../../Errors/AppErrors";

@injectable()
class CreateUserUseCase{
      constructor(
          @inject('UsersRepository')
          private usersRepository: IUsersRepository
      ) {}

      async execute({name, email, password, driver_license}:ICreateUsersDTO): Promise<void>{

            const userAlreadyExists = await this.usersRepository.findByEmail(email);

            if (userAlreadyExists){
                  throw new AppErrors("User already Exists!");
            }

            const passwordHash = await hash(password, 8)

            await this.usersRepository.create({
                  name,
                  email,
                  password: passwordHash,
                  driver_license
            })
      }
}

export {CreateUserUseCase}
