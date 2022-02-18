import {ICategoriesRepository} from "./ICategoriesRepository";
import {Category} from "../model/Category";


class PostgresCategoriesRepository implements ICategoriesRepository {
    findByName(name: string): Category {
        console.log(name)
        return null
    }
    list(): Category[] {
        return null
    }
    create(name: string, description: string) {
        console.log(name, description)
    }

}

export {PostgresCategoriesRepository}