import { fetchFromTMDB } from '../utils/api';
import { Movie, StreamingInfo } from '../interfaces/movie';

export const getStudioA24Movies = async (): Promise<Movie[]> => {
  const data = await fetchFromTMDB<{ results: any[] }>('discover/movie', {
    with_companies: '18441', // TMDB ID for Studio A24
  });

  return data.results.map((movie) => ({
    id: movie.id,
    title: movie.title,
    releaseDate: movie.release_date,
    posterPath: movie.poster_path,
  }));
};

export const getStreamingInfo = async (movieId: number): Promise<StreamingInfo[]> => {
  const data = await fetchFromTMDB<{ results: Record<string, any>[] }>(`movie/${movieId}/watch/providers`);

  return Object.entries(data.results).map(([providerName, details]) => ({
    providerName,
    link: details.link,
  }));
};
