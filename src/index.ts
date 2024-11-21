import express, { Request, Response, NextFunction } from 'express';

import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware';
import { CustomError } from './errors/CustomError';
import { searchStudioAndFetchMovies } from './services/movieService';
import { fetchAndSaveStudioList } from './services/studioServices';

const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// Endpoint to fetch and save studio list
app.get(
  '/api/studios',
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      console.log('Handling request to /api/studios...');
      await fetchAndSaveStudioList();
      res
        .status(200)
        .json({ message: 'Studios fetched and saved successfully.' });
    } catch (error) {
      console.error('Error occurred in /api/studios handler:', error);
      next(new CustomError('Failed to fetch and save studio list.', 500));
    }
  }
);

// Endpoint to search for a studio and fetch its movies
app.get(
  '/api/studios/movies',
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.query as { name?: string };

    if (!name) {
      console.error('Studio name missing in request query');
      res
        .status(400)
        .json({ error: 'Studio name is required as a query parameter.' });
      return; // Explicitly return to end execution here.
    }

    try {
      console.log(`Handling request to /api/studios/movies?name=${name}`);
      const movies = await searchStudioAndFetchMovies(name);

      if (movies.length === 0) {
        console.log(`No movies found for the studio: ${name}`);
        res
          .status(200)
          .json({ message: 'No movies found for the given studio.' });
        return; // Explicitly return to end execution here.
      }

      console.log(`Movies fetched for the studio ${name}:`, movies);
      res.status(200).json(movies);
    } catch (error) {
      console.error('Error occurred in /api/studios/movies handler:', error);
      next(new CustomError('Internal Server Error', 500));
    }
  }
);

// Use the existing error handling middleware
app.use(errorHandlerMiddleware);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
