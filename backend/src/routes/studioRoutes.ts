import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { ErrorLog } from '../errors/errorLogs';
import { getCompanyById, getCompanyByName } from '../services/companyService';
import { findMoviesByProductionCompany } from '../services/studioServices';

const router = express.Router();

router.get('/company/:id', async (req: Request, res: Response) => {
	try {
		const companyId = parseInt(req.params.id, 10);
		const company = await getCompanyById(companyId);
		if (company) {
			res.json(company);
		} else {
			res.status(404).json({ message: 'Company not found' });
		}
	} catch (err) {
		const error = new ErrorLog(
			'ERR_GET_COMPANY_BY_ID_FAILED',
			'Failed to retrieve company data.'
		);
		res.status(error.status).json({ message: error.message });
	}
});

router.get('/company/name/:name', async (req: Request, res: Response) => {
	try {
		const companyName = req.params.name;
		const company = await getCompanyByName(companyName);
		if (company) {
			res.json(company);
		} else {
			res.status(404).json({ message: 'Company not found' });
		}
	} catch (err) {
		const error = new ErrorLog(
			'ERR_GET_COMPANY_BY_NAME_FAILED',
			'Failed to retrieve company data.'
		);
		res.status(error.status).json({ message: error.message });
	}
});

router.get(
	'/movies/production-company/:companyId',
	async (req: Request, res: Response) => {
		try {
			const companyId = parseInt(req.params.companyId, 10);
			const movies = findMoviesByProductionCompany(companyId);
			res.json(movies);
		} catch (err) {
			console.error('Error loading movies by production company ID:', err);
			const error = new ErrorLog(
				'ERR_GET_MOVIES_BY_COMPANY_ID_FAILED',
				'Failed to load movies for the production company.'
			);
			res.status(error.status).json({ message: error.message });
		}
	}
);

export default router;
