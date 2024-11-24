import { Company } from '../interfaces/company';
import companiesDataRaw from '../../data/production_company_ids_11_22_2024.json';

const companiesData: Company[] = (companiesDataRaw as { data: Company[] }).data;

export const getCompanyById = async (id: number): Promise<Company | null> => {
	const company = companiesData.find((company) => company.id === id);
	return company || null;
};

export const getCompanyByName = async (
	name: string
): Promise<Company | null> => {
	const company = companiesData.find(
		(company) => company.name.toLowerCase() === name.toLowerCase()
	);
	return company || null;
};
