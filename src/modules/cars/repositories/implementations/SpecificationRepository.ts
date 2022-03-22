import {ICreateSpecificationDTO, ISpecificationRepository} from "../ISpecificationRepository";
import {Specification} from "../../model/Specification";


class SpecificationRepository implements ISpecificationRepository{
    private specifications: Specification[];

    constructor() {
        this.specifications = [];
    }

    create({name, description}: ICreateSpecificationDTO): void {
        const specification = new Specification();


        Object.assign(specification,{
            name,
            description,
            create_at: new Date()
        })

        this.specifications.push(specification);
    }

    findByName(name: string) {
        const specification = this.specifications.find(specification => specification.name === name)
        return specification;
    }

}

export {SpecificationRepository}