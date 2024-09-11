import { readJSON } from '.././util.js';
import { Router } from 'express';
import { validateMovie, validatePartialMovie } from '../schemas/movies.js';
import { randomUUID } from 'node:crypto'
import { MovieModel } from '../models/movies.js';
import { MoviesController } from '../controller/movies.js';

export const movieRouter = Router()

movieRouter.get('/', MoviesController.getAll)

movieRouter.get('/:id', MoviesController.getById)

movieRouter.post('/', MoviesController.create)

movieRouter.delete('/:id', MoviesController.delete)

movieRouter.patch('/:id', MoviesController.update)

