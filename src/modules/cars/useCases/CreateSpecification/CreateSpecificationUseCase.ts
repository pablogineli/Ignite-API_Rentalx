import {ISpecificationRepository} from "@modules/cars/repositories/ISpecificationRepository";
import {inject, injectable} from "tsyringe";
import {AppErrors} from "@errors/AppErrors";


interface IRequest{
    name: string;
    description: string;
}

@injectable()
class CreateSpecificationUseCase {
    constructor(
        @inject('SpecificationRepository')
        private specificationRepository: ISpecificationRepository) {
    }
    async execute({name, description}:IRequest): Promise<void>{
        const specificationAlreadyExists = await this.specificationRepository.findByName(name)

        if(specificationAlreadyExists){
            throw new AppErrors('Specification Already Exists!')
        }
        await this.specificationRepository.create({name, description});
    }
}
export {CreateSpecificationUseCase}
