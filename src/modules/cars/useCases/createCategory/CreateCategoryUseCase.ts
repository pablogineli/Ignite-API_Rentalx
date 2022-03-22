import {ICategoriesRepository} from "../../repositories/ICategoriesRepository";


interface IRequest{
    name: string;
    description: string;
}


/**
 *  [x] - Definir o tipo de retorno
 *  [x] - Alterar o retorno de erro
 *  [x] - Acessar o repositorio
 */
class CreateCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    execute({name, description}:IRequest){
        const categoryAlreadyExists = this.categoriesRepository.findByName(name);

        if (categoryAlreadyExists){
            throw new Error("Category Already exists!")
        }

        this.categoriesRepository.create({name, description})
    }
}

export {CreateCategoryUseCase}