import express, { Request, Response, NextFunction } from 'express';
import { getMoviesByCompany } from '../services/companyService';
import { sendSuccess, sendError } from '../utils/responseUtils';
import { errorLibrary, ErrorLog } from '../errors/errorLog';

const router = express.Router();

router.get(
	'/company/:id/movies',
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const companyId = parseInt(req.params.id, 10);
			const movies = await getMoviesByCompany(companyId);
			sendSuccess(res, { movies });
		} catch (error) {
			if (error instanceof ErrorLog) {
				sendError(res, error);
			} else {
				sendError(res, errorLibrary.INTERNAL_SERVER_ERROR);
			}
		}
	}
);

export default router;
