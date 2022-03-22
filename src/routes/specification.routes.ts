import {Router} from "express";
import {SpecificationRepository} from "../modules/cars/repositories/implementations/SpecificationRepository";
import {creteSpecificationController} from "../modules/cars/useCases/CreateSpecification";

const specificationRoutes =  Router();


specificationRoutes.post("/", (request, response)=>{
 return creteSpecificationController.handle(request, response)
})


export {specificationRoutes}