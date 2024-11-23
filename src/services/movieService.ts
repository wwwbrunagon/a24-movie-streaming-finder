import path from 'path';
import fs from 'fs/promises';
import { fetchFromTMDB } from '../api/fetchFromTMDB';
import { Movie } from '../interfaces/movie';
import { Studio } from '../interfaces/studio';
import { ErrorLog } from '../errors/errorLogs';

export const searchStudioAndFetchMovies = async (
  searchName: string
): Promise<Movie[]> => {
  try {
    const filePath = path.resolve(__dirname, '../../data/studios.json');
    console.log(`Loading studios from file: ${filePath}`);

    const studiosData = await fs.readFile(filePath, 'utf-8');
    const studios: Studio[] = JSON.parse(studiosData);

    console.log('Searching for studio:', searchName);
    const studio = studios.find((s) =>
      s.name.toLowerCase().includes(searchName.toLowerCase())
    );
    if (!studio) {
      throw new ErrorLog(
        'ERR_STUDIO_NOT_FOUND',
        `Studio "${searchName}" not found.`,
        null,
        404
      );
    }

    console.log(`Studio found: ${studio.name} (ID: ${studio.id})`);
    console.log('Fetching movies for the studio from TMDB...');

    const data = await fetchFromTMDB<{ results: Movie[] }>('discover/movie', {
      with_companies: studio.id.toString(),
    });

    if (!data || !data.results || data.results.length === 0) {
      console.log('No movies found for the given studio.');
      return [];
    }

    console.log('Movies fetched successfully:', data.results);
    return data.results;
  } catch (err) {
    console.error('Error in searchStudioAndFetchMovies:', err);
    if (err instanceof ErrorLog) {
      throw err;
    }
    throw new ErrorLog(
      'ERR_FETCH_MOVIES_FAILED',
      'Failed to fetch movies for the studio.',
      null,
      500
    );
  }
};
