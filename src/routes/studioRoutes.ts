import { Router, Request, Response, NextFunction } from 'express';
import Logger from '../utils/logger';
import { searchStudioAndFetchMovies } from '../services/movieService';
import { ServerError } from '../errors/ServerError';

const router = Router();

router.get(
  '/studios/movies',
  async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.query as { name?: string };

    if (!name) {
      Logger.warn('Studio name missing in request query.');
      res
        .status(400)
        .json({ error: 'Studio name is required as a query parameter.' });
      return;
    }

    try {
      Logger.info(`Searching for movies by studio: ${name}`);
      const movies = await searchStudioAndFetchMovies(name);

      if (movies.length === 0) {
        Logger.info(`No movies found for the studio: ${name}`);
        res
          .status(200)
          .json({ message: 'No movies found for the given studio.' });
        return;
      }

      Logger.info(`Movies fetched for the studio ${name}:`, movies);
      res.status(200).json(movies);
    } catch (error) {
      Logger.error('Error occurred in /api/studios/movies handler:', error);
      next(new ServerError('Internal Server Error', 500));
    }
  }
);

export default router;
