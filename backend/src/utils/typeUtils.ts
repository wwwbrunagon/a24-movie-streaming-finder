import { Movie } from '../interfaces/movie';

export type TMDBResponse<T> = { results: T[] };

export const mapTMDBResults = (
  data: TMDBResponse<Movie>,
  mapper: (item: Movie) => Movie
): Movie[] => {
  return data.results.map(mapper);
};
