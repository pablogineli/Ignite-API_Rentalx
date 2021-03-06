import {IUsersRepository} from "../IUsersRepository";
import {ICreateUsersDTO} from "../../dtos/ICreateUsersDTO";
import {getRepository, Repository} from "typeorm";
import {User} from "../../entities/User";


class UsersRepository implements IUsersRepository{
    private repository: Repository<User>;

    constructor() {
        this.repository = getRepository(User)
    }

    async create({name, email, password, driver_license}: ICreateUsersDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            password,
            driver_license
        })


        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User> {
        return await this.repository.findOne({email})
    }

}

export {UsersRepository}
