import {Category} from "../model/Category";


// DTO => Data Transfer object
interface ICreateCategoryDTO{
    name: string;
    description: string;
}

class CategoriesRepositories {

    private categories: Category[];

    constructor() {
        this.categories = [];
    }

    /**
     * responsavel por cadastrar uma categoria
     */
    create({description, name}: ICreateCategoryDTO): void {
        const category = new Category();

        Object.assign(category, {
            name,
            description,
            created_at: new Date()

        })

        this.categories.push(category);
    }

    list(): Category[] {
        return this.categories;
    }

    findByName(name: string): Category{
        const category = this.categories.find((category)=> category.name === name);

        return category;
    }


}


export {CategoriesRepositories}