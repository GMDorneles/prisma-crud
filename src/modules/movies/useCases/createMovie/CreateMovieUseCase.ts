import { Movies } from "@prisma/client";
import { prisma } from "../../../../prisma/client";
import { AppError } from "../../../../errors/AppErrors";
import { CreateMovieDTO } from "../../dtos/CreateMoviesDTO";

export class CreateMovieUseCase {
    async execute({ title, duration, release_date }: CreateMovieDTO): Promise<Movies> {

        const movieAlreadyExists = await prisma.movies.findUnique({
            where: {
                title,
            },
        });

        if (movieAlreadyExists) {
            throw new AppError("Movie already exists!");
        }

        const movie = await prisma.movies.create({
            data: {
                title,
                duration,
                release_date,
            },
        });

        return movie;
    }
}