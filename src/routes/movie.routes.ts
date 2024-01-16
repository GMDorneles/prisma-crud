import { Router } from "express";
import { CreateMovieController } from "../modules/movies/useCases/createMovie/CreateMovieController";

const createMovieController = new CreateMovieController();
const createMovieRentController = new CreateMovieController();

const movieRoutes = Router();
movieRoutes.post("/", createMovieController.handle);
movieRoutes.post("/rent", createMovieRentController.handle);

export { movieRoutes };
