import {Router} from "express";
import {creteSpecificationController} from "../modules/cars/useCases/CreateSpecification";

const specificationRoutes =  Router();


specificationRoutes.post("/", (request, response)=>{
 return creteSpecificationController.handle(request, response)
})


export {specificationRoutes}
