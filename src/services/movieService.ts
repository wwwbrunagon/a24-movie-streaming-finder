import { fetchFromTMDB } from '../api/fetchFromTMDB';
import { Movie, ProviderDetails, StreamingInfo } from '../interfaces/movie';
import { mapTMDBResults, TMDBResponse } from '../utils/typeUtils';

export const getStudioA24Movies = async (): Promise<Movie[]> => {
  const data: TMDBResponse<Movie> = await fetchFromTMDB('discover/movie', {
    with_companies: '18441',
  });

  return mapTMDBResults(data, (movie: Movie) => ({
    id: movie.id,
    title: movie.title,
    releaseDate: movie.releaseDate,
    posterPath: movie.posterPath,
  }));
};

export const getStreamingInfo = async (
  movieId: number
): Promise<StreamingInfo[]> => {
  const data: TMDBResponse<Record<string, ProviderDetails>> =
    await fetchFromTMDB(`movie/${movieId}/watch/providers`);

  return Object.entries(data.results).map(([providerName, details]) => ({
    providerName,

    link:
      typeof details.link === 'string'
        ? details.link
        : details.link?.link || '',
  }));
};