export interface Movie {
  id: number;
  title: string;
  releaseDate: string;
  posterPath: string;
  movie?: string;
  release_date?: string;
  poster_path?: string;
}

export interface ProviderDetails {
  link: string;
  providerName: string;
  details?: string;
}

export interface StreamingInfo {
  link: string;
  providerName: string;
}
