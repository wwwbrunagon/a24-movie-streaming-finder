import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import { Company } from './interface/company';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchCompanies = async (name: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<Company[]>(`/api/company/name/${name}`);
      setCompanies(response.data);
    } catch (err) {
      setError('An error occurred while searching for companies.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== '') {
      searchCompanies(searchTerm);
    }
  };

  // Recursive function to find movies from company
  const findMoviesRecursively = (
    companies: Company[],
    productionCompanyIds: number[]
  ): number[] => {
    let result: number[] = [];
    companies.forEach((company) => {
      if (productionCompanyIds.includes(company.id)) {
        result.push(company.id);
      }
    });
    return result;
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Movie Finder</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a Studio"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}
        <div className="companies-list">
          {companies.map((company) => (
            <div key={company.id} className="company">
              <h2>{company.name}</h2>
              {company.logo_path && (
                <img src={company.logo_path} alt={company.name} />
              )}
              <p>{company.description}</p>
              {company.headquarters && (
                <p>Headquarters: {company.headquarters}</p>
              )}
              {company.homepage && (
                <a
                  href={company.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Homepage
                </a>
              )}
            </div>
          ))}
        </div>
      </header>
    </div>
  );
};

export default App;
