import {Router} from "express";
import { CreateSpecificationController} from "../modules/cars/useCases/CreateSpecification/CreateSpecificationController";
const specificationRoutes =  Router();

const creteSpecificationController = new CreateSpecificationController()

specificationRoutes.post("/", creteSpecificationController.handle)


export {specificationRoutes}
