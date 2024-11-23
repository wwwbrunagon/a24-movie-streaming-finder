import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../config';

export async function fetchFromTMDB<T>(
  endpoint: string,
  params?: { [key: string]: string }
): Promise<T> {
  try {
    const url = `${TMDB_BASE_URL}${
      endpoint.startsWith('/') ? endpoint : `/${endpoint}`
    }`;
    console.log(`Fetching from TMDB: ${url}`);

    const response = await axios.get<T>(url, {
      params: {
        api_key: TMDB_API_KEY,
        ...params,
      },
    });

    console.log('TMDB response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching data from TMDB:', error);
    throw new Error('Error fetching data from TMDB');
  }
}
