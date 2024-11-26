import { CompanyMoviesResponse } from '../interfaces/company';
import { errorLibrary } from '../errors/errorLog';
import { Movie } from '../interfaces/movie';
import { logger } from '../utils/logger';
import { fetchFromTMDB } from '../api/fetchFromTMDB';

export async function getMoviesByCompany(companyId: number): Promise<Movie[]> {
	try {
		const endpoint = `/company/${companyId}/movies`;
		const data = await fetchFromTMDB<CompanyMoviesResponse>(endpoint);
		return data.results;
	} catch (error) {
		const logError = errorLibrary.INTERNAL_SERVER_ERROR;
		logger.error(logError, { companyId });
		throw logError;
	}
}
