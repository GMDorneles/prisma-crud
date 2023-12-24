import { User } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { CreateUserDTO } from "../../dtos/CreateUserDTO";
import { AppError } from "../../../../errors/AppErrors";

export class CreateUserUseCase {
    async execute({ name, email }: CreateUserDTO): Promise<User> {
        //Verificar se ja existe
        const userAlreadyExists = await prisma.user.findUnique({
            //vai buscar usuario  com email igual ao da req
            where: {
                email
            }
        });
        if (userAlreadyExists) {
            throw new AppError("User Already exists!")
        }
        //criar
        const user = await prisma.user.create({
            data: {
                name,
                email
            }
        });
        return user;
    }
}