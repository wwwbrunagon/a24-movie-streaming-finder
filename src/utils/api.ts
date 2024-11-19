import axios from "axios";
import { TMDB_API_KEY, TMDB_BASE_URL } from "../config";

export const fetchFromTMDB = async <T>(
  endpoint: string,
  params: Record<string, string> = {}
): Promise<T> => {
  const url = `${TMDB_BASE_URL}/${endpoint}`;
  try {
    const response = await axios.get<T>(url, {
      params: { api_key: TMDB_API_KEY, ...params },
    });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`TMDB API Error: ${error.message}`);
    } else {
      throw new Error("An unknown error occurred");
    }
  }
};
