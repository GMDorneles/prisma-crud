import { Movies } from "@prisma/client";
import { prisma } from "../../../../prisma/client";

export class GetMoviesByReleaseDateUseCase {
    async execute(): Promise<Movies[]> {
        const movies = await prisma.movies.findMany({
            orderBy: {
                release_date: "desc",
            },
            include: {
                MovieRent: {
                    select: {
                        user: {
                            select: {
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });

        return movies;
    }
}