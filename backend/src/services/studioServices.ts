import fs from 'fs/promises';
import path from 'path';
import { logger } from '../utils/logger';

const dataPath = path.resolve(
	__dirname,
	'../../data/production_company_ids_11_22_2024.json'
);

export const getMoviesByProductionCompany = async (companyId: number) => {
	try {
		logger.info(`Data path: ${dataPath}`);
		const data = await fs.readFile(dataPath, 'utf-8');
		logger.info(`Successfully read data from file: ${dataPath}`);

		let parsedData;
		try {
			parsedData = JSON.parse(data);
			logger.info(
				`Parsed data successfully. Type of parsed data: ${typeof parsedData}`
			);
		} catch (parseError) {
			logger.error(`Error parsing JSON data: ${parseError}`);
			throw new Error('Failed to parse production company data');
		}

		if (!parsedData.data || !Array.isArray(parsedData.data)) {
			logger.error('Parsed data is not in the expected format');
			throw new Error('Parsed data is not in the expected format');
		}

		const movies = parsedData.data;
		logger.info(
			`Parsed movies data successfully. Total records: ${movies.length}`
		);

		const filteredMovies = movies.filter(
			(movie: any) => Number(movie.id) === Number(companyId)
		);

		logger.info(
			`Movies found for company ID ${companyId}: ${filteredMovies.length}`
		);
		return filteredMovies;
	} catch (error) {
		logger.error(`Error reading production company data: ${error}`);
		throw new Error('Failed to read production company data');
	}
};
