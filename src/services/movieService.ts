import path from 'path';
import fs from 'fs/promises';

import { fetchFromTMDB } from '../api/fetchFromTMDB';
import { Movie } from '../interfaces/movie';
import { CustomError } from '../errors/CustomError';
import { Studio } from '../interfaces/studio';

/**
 * Loads studio list, searches for a specific studio, and fetches its movies.
 */
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
      throw new CustomError(`Studio "${searchName}" not found.`, 404);
    }

    console.log(`Studio found: ${studio.name} (ID: ${studio.id})`);
    console.log('Fetching movies for the studio from TMDB...');

    // Fetch movies for the found studio
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
    if (err instanceof CustomError) {
      throw err;
    }
    throw new CustomError('Failed to fetch movies for the studio.', 500);
  }
};
