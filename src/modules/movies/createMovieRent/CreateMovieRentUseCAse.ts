import { CreateMovieRentDTO } from "../dtos/CreateMovieRentDTO";

export class CreateMovieRentUseCase {
    async execute({ movieID, userID }: CreateMovieRentDTO) {
      //verificar se o filme exite

      //verificar se o filme foi alugado por outra pessoa 

      
    }
}