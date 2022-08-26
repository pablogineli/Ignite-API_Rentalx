import {AuthenticateUserUseCase} from "./AuthenticateUserUseCase";
import {UserRepositoryInMemory} from "@modules/accounts/repositories/in-memory/UserRepositoryInMemory";
import {CreateUserUseCase} from "@modules/accounts/useCases/createUser/CreateUserUseCase";
import {ICreateUserDTO} from "@modules/accounts/dtos/ICreateUserDTO";
import {AppErrors} from "@errors/AppErrors";

describe("Authenticate User",()=>{

    let authenticateUserUseCase: AuthenticateUserUseCase;
    let userRepositoryInMemory: UserRepositoryInMemory;
    let createUserUseCase: CreateUserUseCase;

    beforeEach(()=>{
        userRepositoryInMemory = new UserRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
        createUserUseCase= new CreateUserUseCase(userRepositoryInMemory);

    })

    it('should be able to authenticate an user',  async ()=> {
        const user: ICreateUserDTO = {
            driver_license: "0001234",
            email: "user@test.com",
            password: "1234",
            name: "Users test"
        }

        await createUserUseCase.execute(user);

        const result =  await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password,
        })

        expect(result).toHaveProperty("token")
    });

    it('should not be able to authenticate an nonexistent user',  async () => {
        expect(async ()=>{
            await authenticateUserUseCase.execute({
                email: "Email false",
                password: "1234",
            });
        }).rejects.toBeInstanceOf(AppErrors)
    });

    it('should not be able to authenticate with incorrect password',  () => {
        expect(async ()=>{
            const user: ICreateUserDTO = {
                driver_license:"9999",
                email:"user@user.com.br",
                password: "1234",
                name: "User Test Error"
            }
            await createUserUseCase.execute(user);

            await authenticateUserUseCase.execute({
                email: user.email,
                password: "Incorrect Password"
            });
        }).rejects.toBeInstanceOf(AppErrors)
    });

})

