import {Category} from "../../entities/Category";
import {ICategoriesRepository, ICreateCategoryDTO} from "../ICategoriesRepository";
import {getRepository, Repository} from "typeorm";



class CategoriesRepository implements ICategoriesRepository{
    /**
     * Criação do Objeto de Repositorio referenciando a Entidade de Categoria
     */
    private repository: Repository<Category>


    /**
     * construção do objeto com as Propriedades das Categorias
     */
     constructor() {
        this.repository = getRepository(Category)
    }

    /*public static getInstance(): CategoriesRepository{
        if (!CategoriesRepository.INSTANCE){
            CategoriesRepository.INSTANCE = new CategoriesRepository();
        }
        return CategoriesRepository.INSTANCE
    }*/

    /**
     * Responsavel por cadastrar uma categoria
     */
    async create({description, name}: ICreateCategoryDTO):Promise<void> {

        /**
         *  Metodo Create è utilizado para realização dos cadastro assim os parametros enviados a para criação são
         *  preparados para inserção com base na entidade associada
         */

        const category = this.repository.create({
            description,
            name
        });

        await this.repository.save(category)
    }

    async list(): Promise<Category[]> {
       const categories =  await this.repository.find()
        return categories
    }

    async findByName(name: string): Promise<Category>{
       return  await this.repository.findOne({name})
    }
}


export {CategoriesRepository}
