import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../config';

export const fetchFromTMDB = async <T>(
  path: string,
  params?: Record<string, string>
): Promise<T> => {
  const url = `${TMDB_BASE_URL}/${path}?api_key=${TMDB_API_KEY}&${new URLSearchParams(
    params || {}
  ).toString()}`;

  const response = await axios.get<T>(url);
  return response.data;
};
