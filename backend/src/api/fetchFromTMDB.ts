import axios from 'axios';
import { TMDB_API_KEY, TMDB_BASE_URL } from '../config';
import { errorLibrary, ErrorLog } from '../errors/errorLog';
import { logger } from '../utils/logger';

export async function fetchFromTMDB<T>(
	endpoint: string,
	params: { [key: string]: string | number } = {}
): Promise<T> {
	try {
		const url = `${TMDB_BASE_URL}${
			endpoint.startsWith('/') ? endpoint : `/${endpoint}`
		}`;

		logger.info(`Fetching data from TMDB endpoint: ${url}`, { params });

		const response = await axios.get<T>(url, {
			params: {
				api_key: TMDB_API_KEY,
				...params,
			},
		});

		logger.info(`Successfully fetched data from TMDB`, { data: response.data });
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			if (error.response?.status === 401) {
				const logError = new ErrorLog(
					'ERR_UNAUTHORIZED',
					'Unauthorized access to TMDB API. Please check your API key.',
					error.message,
					401
				);
				logger.error(logError, { error, endpoint });
				throw logError;
			} else if (error.response?.status === 404) {
				const logError = new ErrorLog(
					'ERR_NOT_FOUND',
					'The requested resource was not found in TMDB.',
					error.message,
					404
				);
				logger.error(logError, { error, endpoint });
				throw logError;
			}
			// Handle other status codes similarly if needed
		}

		// Default to an internal server error for unexpected issues
		logger.error(errorLibrary.INTERNAL_SERVER_ERROR, { error });

		throw errorLibrary.INTERNAL_SERVER_ERROR;
	}
}
