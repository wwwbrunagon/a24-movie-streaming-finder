export type TMDBResponse<T> = { results: T[] };

export const mapTMDBResults = <T extends Record<string, unknown>>(
  data: TMDBResponse<T>,
  mapper: (item: T) => T
): T[] => {
  return data.results.map(mapper);
};
