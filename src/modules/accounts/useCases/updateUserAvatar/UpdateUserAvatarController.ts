import {Request, Response} from "express";
import {container} from "tsyringe";
import {UpdateUserAvatarUseCase} from "./UpdateUserAvatarUseCase";


class UpdateUserAvatarController{
    async handle(request:Request, response:Response):Promise<Response>{
        const { id } = request.user
        const  avatar_file = request.file.filename

        const uploadUserAvatar = container.resolve(UpdateUserAvatarUseCase);

        await uploadUserAvatar.execute({user_id: id, avatar_file})

        return response.status(200).send()

    }
}

export { UpdateUserAvatarController }
