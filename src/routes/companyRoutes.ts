import express from 'express';
import { getCompanyById, getCompanyByName } from '../services/companyService';

const router = express.Router();

router.get('/company/:id', async (req, res) => {
  const companyId = parseInt(req.params.id, 10);
  try {
    const company = await getCompanyById(companyId);
    if (company) {
      res.json(company);
    } else {
      res.status(404).json({ message: 'Company not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the company by ID.' });
  }
});

router.get('/company/name/:name', async (req, res) => {
  const companyName = req.params.name;
  try {
    const company = await getCompanyByName(companyName);
    if (company) {
      res.json(company);
    } else {
      res.status(404).json({ message: 'Company not found' });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'An error occurred while fetching the company by name.' });
  }
});

export default router;
