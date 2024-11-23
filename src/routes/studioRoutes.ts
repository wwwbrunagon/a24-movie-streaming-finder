import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { ErrorLog } from '../errors/errorLogs';
const router = express.Router();

const dataPath = path.resolve(
  __dirname,
  '../../data/production_company_ids_11_22_2024.json'
);

router.get('/studios', async (req: Request, res: Response) => {
  try {
    console.log(`Loading studios from file: ${dataPath}`);
    const data = await fs.readFile(dataPath, 'utf-8');
    const studios = JSON.parse(data);
    res.json(studios);
  } catch (err) {
    console.error('Error loading production company data:', err);
    const error = new ErrorLog(
      'ERR_LOAD_STUDIOS_FAILED',
      'Failed to load production company data.',
      null,
      500
    );
    res.status(error.status).json({ message: error.message });
  }
});

export default router;
