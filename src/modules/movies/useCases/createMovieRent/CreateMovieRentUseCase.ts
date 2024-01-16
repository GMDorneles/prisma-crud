import { AppError } from "../../../../errors/AppErrors";
import { prisma } from "../../../../prisma/client";
import { CreateMovieRentDTO } from "../../dtos/CreateMovieRentDTO";

export class CreateMovieRentUseCase {
  async execute({ movieId, userId }: CreateMovieRentDTO): Promise<void> {
    //verificar se o filme exite
    const movieExists = await prisma.movies.findUnique({
      where: {
        id: movieId
      }
    });
    if (!movieExists) {
      throw new AppError("movie does not exists!");
    }
    //verificar se o filme foi alugado por outra pessoa 
    const moiveAlreadyRented = await prisma.movieRent.findFirst({
      where: {
        movieId
      }
    });

    if (moiveAlreadyRented) {
      throw new AppError("Movie alredy rented!");
    }

    // verificar se  o usuário existe
    const userExists = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (!userExists) {
      throw new AppError("User does not exists!");
    }

    //criar locação
    await prisma.movieRent.create({
      data: {
        movieId,
        userId
      }
    });
  }
}