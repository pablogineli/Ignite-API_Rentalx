import {CreateCategoryUseCase} from "./CreateCategoryUseCase";
import {CategoryRepositoryInMemory} from "@modules/cars/repositories/in-memory/CategoryRepositoryInMemory";
import {AppErrors} from "@errors/AppErrors";

let createCategoryUseCase: CreateCategoryUseCase;
let categoriesRepositoryInMemory: CategoryRepositoryInMemory;

describe("Create Category", ()=>{

    beforeEach(()=>{
        categoriesRepositoryInMemory = new CategoryRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(categoriesRepositoryInMemory)
    })

    it('should be able to create a new category', async  ()=> {
        const category = {
            name: "Category Teste",
            description: "Category description Teste",
        }
       await createCategoryUseCase.execute({
            name: category.name,
            description: category.description,
        });
       const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name)

        expect(categoryCreated).toHaveProperty("id")

    });

    it('should not be able to create a new category with name exists', async  ()=> {
        expect(async () => {
            const category = {
                name: "Category Teste",
                description: "Category description Teste",
            }

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });

            await createCategoryUseCase.execute({
                name: category.name,
                description: category.description,
            });
        }).rejects.toBeInstanceOf(AppErrors);
    });
})
