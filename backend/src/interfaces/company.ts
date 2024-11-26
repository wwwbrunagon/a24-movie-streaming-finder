import { Movie } from "./movie";

export interface Company {
  id: number;
  name: string;
  logo_path?: string;
  description?: string;
  headquarters?: string;
  homepage?: string;
  data?: unknown;
}

export interface CompanyMoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}