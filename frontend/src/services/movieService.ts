import axios from 'axios';

export const fetchCompanyById = async (id: number) => {
  try {
    const response = await axios.get(`/api/company/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching company by ID', error);
    throw error;
  }
};

export const fetchCompanyByName = async (name: string) => {
  try {
    const response = await axios.get(`/api/company/name/${name}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching company by name', error);
    throw error;
  }
};

export const fetchMoviesByProductionCompany = async (companyId: number) => {
  try {
    const response = await axios.get(`/api/movies/production-company/${companyId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching movies by production company', error);
    throw error;
  }
};
