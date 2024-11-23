import { Movie } from '../interfaces/movie';
import { CustomError } from '../errors/CustomError';
import fs from 'fs/promises';
import path from 'path';
import { fetchFromTMDB } from '../api/fetchFromTMDB';

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
      throw new CustomError(`Studio "${searchName}" not found`, 404);
    }

    const movies: Movie[] = await fetchFromTMDB<Movie[]>('discover/movie', {
      with_companies: studio.id.toString(),
    });

    return movies;
  } catch (error) {
    if (error instanceof CustomError) {
      throw error;
    } else {
      console.error('Unexpected error:', error);
      throw new CustomError('Failed to fetch movies for the studio.', 500);
    }
  }
};
