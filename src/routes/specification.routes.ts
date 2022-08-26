import {Router} from "express";
import { CreateSpecificationController} from "@modules/cars/useCases/CreateSpecification/CreateSpecificationController";
import {ensureAuthenticated} from "../middlewares/ensureAuthenticated";
const specificationRoutes =  Router();

const creteSpecificationController = new CreateSpecificationController()
specificationRoutes.use(ensureAuthenticated)
specificationRoutes.post("/", creteSpecificationController.handle)


export {specificationRoutes}
