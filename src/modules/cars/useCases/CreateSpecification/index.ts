import {SpecificationRepository} from "../../repositories/implementations/SpecificationRepository";
import {CreateSpecificationUseCase} from "./CreateSpecificationUseCase";
import {CreateSpecificationController} from "./CreateSpecificationController";


const specificationRepository = new SpecificationRepository();
const createSpecificationUseCase = new CreateSpecificationUseCase(specificationRepository);
const creteSpecificationController = new CreateSpecificationController(createSpecificationUseCase);

export {creteSpecificationController}