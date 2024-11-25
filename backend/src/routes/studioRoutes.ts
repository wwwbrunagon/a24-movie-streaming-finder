import express, { Request, Response } from 'express';
import { ErrorLog } from '../errors/errorLog';
import { getCompanyById, getCompanyByName } from '../services/companyService';
import { logger } from '../utils/logger';

const router = express.Router();

router.get('/company/:id', async (req: Request, res: Response) => {
	try {
		const companyId = parseInt(req.params.id, 10);
		logger.info(`Received request to get company by ID: ${companyId}`);
		const company = await getCompanyById(companyId);
		if (company) {
			logger.info(`Company found: ${company.name}`);
			res.json(company);
		} else {
			logger.warn(`Company not found for ID: ${companyId}`);
			res.status(404).json({ message: 'Company not found' });
		}
	} catch (err) {
		logger.error(`Error retrieving company by ID:${err}`);
		const error = new ErrorLog(
			'500 - ERR_GET_COMPANY_BY_ID_FAILED',
			'Failed to retrieve company data.'
		);
		res.status(error.status).json({ message: error.message });
	}
});

router.get('/company/name/:name', async (req: Request, res: Response) => {
	try {
		const companyName = req.params.name;
		logger.info(`Received request to get company by name: ${companyName}`);
		const company = await getCompanyByName(companyName);
		if (company) {
			logger.info(`Company found: ${company.name}`);
			res.json(company);
		} else {
			logger.warn(`Company not found for name: ${companyName}`);
			res.status(404).json({ message: 'Company not found' });
		}
	} catch (err) {
		logger.error(`Error retrieving company by name: ${err}`);
		const error = new ErrorLog(
			'500 - ERR_GET_COMPANY_BY_NAME_FAILED',
			'Failed to retrieve company data.'
		);
		res.status(error.status).json({ message: error.message });
	}
});

export default router;
