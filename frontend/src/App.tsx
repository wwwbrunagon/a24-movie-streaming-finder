import React, { useState } from 'react';
import {
	fetchCompanyById,
	fetchCompanyByName,
	fetchMoviesByProductionCompany,
} from './services/movieService';
import ProductionCompanySearch from './components/ProductionCompanySearch/ProductionCompanySearch';

interface Movie {
	id: number;
	title: string;
	releaseDate: string;
}

interface Company {
	id: number;
	name: string;
}

const App: React.FC = () => {
	const [movies, setMovies] = useState<Movie[]>([]);
	const [company, setCompany] = useState<Company | null>(null);

	const handleSearchById = async (companyId: number) => {
		try {
			const companyData = await fetchCompanyById(companyId);
			setCompany(companyData);
			const moviesData = await fetchMoviesByProductionCompany(companyId);
			setMovies(moviesData);
		} catch (error) {
			console.error('Failed to fetch company or movies', error);
		}
	};

	const handleSearchByName = async (companyName: string) => {
		try {
			const companyData = await fetchCompanyByName(companyName);
			if (companyData) {
				setCompany(companyData);
				const moviesData = await fetchMoviesByProductionCompany(companyData.id);
				setMovies(moviesData);
			} else {
				setMovies([]);
				setCompany(null);
			}
		} catch (error) {
			console.error('Failed to fetch company or movies', error);
		}
	};

	return (
		<div className="app">
			<h1>Find Movies by Production Company</h1>
			<ProductionCompanySearch
				onSearchById={handleSearchById}
				onSearchByName={handleSearchByName}
			/>
			{company && <h2>Company: {company.name}</h2>}
			<div className="movie-list">
				{movies.length > 0 ? (
					<ul>
						{movies.map((movie) => (
							<li key={movie.id}>
								{movie.title} ({movie.releaseDate})
							</li>
						))}
					</ul>
				) : (
					<p>No movies found.</p>
				)}
			</div>
		</div>
	);
};

export default App;
