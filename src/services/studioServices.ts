import { Movie } from '../interfaces/movie';
import fs from 'fs/promises';
import path from 'path';
import { fetchFromTMDB } from '../api/fetchFromTMDB';
import { ErrorLog } from '../errors/errorLogs';

export const searchStudioAndFetchMovies = async (
  searchName: string
): Promise<Movie[]> => {
  try {
    const filePath = path.resolve(__dirname, '../../data/studios.json');
    const studiosData = await fs.readFile(filePath, 'utf-8');
    const studios = JSON.parse(studiosData);
    const studio = studios.find((s: any) =>
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

    const data = await fetchFromTMDB<{ results: Movie[] }>('discover/movie', {
      with_companies: studio.id.toString(),
    });

    if (!data || !data.results || data.results.length === 0) {
      console.log('No movies found for the given studio.');
      return [];
    }

    return data.results;
  } catch (error) {
    if (error instanceof ErrorLog) {
      throw error;
    } else {
      console.error('Unexpected error:', error);
      throw new ErrorLog(
        'ERR_FETCH_MOVIES_FAILED',
        'Failed to fetch movies for the studio.',
        null,
        500
      );
    }
  }
};
