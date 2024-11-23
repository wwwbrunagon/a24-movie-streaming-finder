import fs from 'fs';
import path from 'path';

// Load data once when service is started
const dataPath = path.resolve(
  __dirname,
  '../../data/production_company_ids_11_22_2024.json'
);
let productionData: any;

fs.readFile(dataPath, 'utf-8', (err, data) => {
  if (!err) {
    productionData = JSON.parse(data);
  }
});

export const findMoviesByProductionCompany = (
  companyId: number,
  data?: unknown
): unknown[] => {
  // Initial load data if not supplied in recursion
  if (!data) {
    data = productionData;
  }

  let result: any[] = [];

  const search = (data: any): void => {
    if (Array.isArray(data)) {
      data.forEach((item) => search(item));
    } else if (typeof data === 'object') {
      if (data.id === companyId) {
        result.push(data);
      }
      Object.values(data).forEach((value) => {
        if (typeof value === 'object') {
          search(value);
        }
      });
    }
  };

  search(data);
  return result;
};
