import "reflect-metadata";
import {inject, injectable} from "tsyringe"
import {ICategoriesRepository} from "../../repositories/ICategoriesRepository";
import {AppErrors} from "../../../../Errors/AppErrors";

interface IRequest{
    name: string;
    description: string;
}

/**
 *  [x] - Definir o tipo de retorno
 *  [x] - Alterar o retorno de erro
 *  [x] - Acessar o repositorio
 */
@injectable()
class CreateCategoryUseCase {
    constructor(
        @inject('CategoriesRepository')
        private categoriesRepository: ICategoriesRepository
    ) {}

    async execute({name, description}:IRequest): Promise<void>{
        const categoryAlreadyExists = await this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists){
            throw new AppErrors("Category Already exists!")
        }

       await this.categoriesRepository.create({name, description})
    }
}

export {CreateCategoryUseCase};
