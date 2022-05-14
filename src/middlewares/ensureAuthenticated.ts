import {NextFunction, Request, Response} from "express";
import {verify} from "jsonwebtoken";
import {UsersRepository} from "../modules/accounts/repositories/implementations/UsersRepository";
import {AppErrors} from "../Errors/AppErrors";

interface IPayload{
    sub: string;
}

export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    const authHeader =  request.headers.authorization

    if (!authHeader){
        throw new AppErrors("Token missing!", 401)
    }

    const [, token] = authHeader.split(" ")

    try {
       const { sub:user_id } =  verify(token, "4143a6e6c7900353e5450e861cc5faa5") as IPayload

        const usersRepository = new UsersRepository();
       const user = await usersRepository.findById(user_id)

        if (!user){
            throw new AppErrors("User does not exists!", 401);
        }

        next();
    }catch (err){
            throw new AppErrors("Invalid token!", 401)
    }

}
