import { fetchFromTMDB } from '../api/fetchFromTMDB';
import { Movie, ProviderDetails, StreamingInfo } from '../interfaces/movie';
import { mapTMDBResults, TMDBResponse } from '../utils/typeUtils';

export const getStudioA24Movies = async (): Promise<Movie[]> => {
  const data: TMDBResponse<Movie> = await fetchFromTMDB('discover/movie', {
    with_companies: '18441',
  });

  return mapTMDBResults(data, (movie: Movie) => ({
    id: movie.id,
    title: movie.title,
    releaseDate: movie.releaseDate,
    posterPath: movie.posterPath,
  }));
};

export const getStreamingInfo = async (
  movieId: number
): Promise<StreamingInfo[]> => {
  const data: TMDBResponse<Record<string, ProviderDetails>> =
    await fetchFromTMDB(`movie/${movieId}/watch/providers`);

  return Object.entries(data.results).map(([providerName, details]) => ({
    providerName,

    link:
      typeof details.link === 'string'
        ? details.link
        : details.link?.link || '',
  }));
};

/**
1 - Challenge Setup:
* Implement the fetchCompanies function to fetch and save a list of companies from TMDB.
* Store the data into a file (e.g., companies.json) to be used by the recursive search function.
2 - Recursive Search:
* Develop the searchAndFetchMovies function to find a company in the saved list.
* If the company exists, fetch movies using its ID.
* If it doesn't exist, implement a fallback mechanism to extend the list by calling the API.
3 - Extras for Bonus Points:
* Include file read/write logic for companies.json.
* Add error handling, e.g., what happens if the API call fails or the file is missing.
*/

/**
 * Challenge 1: Fetch and Save Companies and Names from TMDB
 * 
 * The function fetchCompanies should query the TMDB API for companies and associated movie names. 
 * The results should be saved to an appropriate file structure (e.g., a JSON file) 
 * within the TypeScript project for future lookups.
 */
export const fetchCompanies = async (): Promise<void> => {
  // Step 1: Define the API endpoint to fetch production companies.
  const endpoint = 'company/list'; // Hypothetical TMDB endpoint.

  // Step 2: Fetch the data using fetchFromTMDB.
  const data: TMDBResponse<{ id: number; name: string }[]> = 
    await fetchFromTMDB(endpoint);

  // Step 3: Transform the data if necessary.
  const companies = data.results.map(({ id, name }) => ({
    id,
    name,
  }));

  // Step 4: Save the transformed data to a file.
  // You could use `fs` module in Node.js, but for this exercise,
  // simulate the write process as if you're saving to 'companies.json'.
  console.log('Save this data to companies.json:', companies);
  // Task: Implement the actual file-saving logic.
};

/**
 * Challenge 2: Recursive Search and Autofill
 * 
 * This function searches through the list of companies and automatically fills 
 * the `with_companies` parameter for fetching movies based on the company name.
 * If the company isn't found, it should support recursive searching by adding 
 * new companies to the list.
 */
export const searchAndFetchMovies = async (companyName: string): Promise<Movie[]> => {
  // Step 1: Simulate loading the company list from a saved file (e.g., 'companies.json').
  // Task: Implement the actual file-reading logic.
  const companies = [
    { id: 18441, name: 'A24' },
    { id: 420, name: 'Warner Bros. Pictures' },
    // Simulated company list; replace this with file data.
  ];

  // Step 2: Find the company by name.
  const company = companies.find((c) => c.name.toLowerCase() === companyName.toLowerCase());

  if (!company) {
    // Step 3: If not found, log an error or add logic to fetch new companies from the API.
    console.error(`Company '${companyName}' not found!`);
    // Task: Optionally, call `fetchCompanies()` to update the list and retry.
    return [];
  }

  // Step 4: Use the company ID to fetch movies associated with this company.
  const data: TMDBResponse<Movie> = await fetchFromTMDB('discover/movie', {
    with_companies: company.id.toString(),
  });

  // Step 5: Transform and return the movie list.
  return data.results.map((movie: Movie) => ({
    id: movie.id,
    title: movie.title,
    releaseDate: movie.releaseDate,
    posterPath: movie.posterPath,
  }));
};



// Example usage if you´re still using the console and not a front end leindona:
// fetchCompanies().then(() => console.log('Companies fetched and saved!'));
// searchAndFetchMovies('A24').then((movies) => console.log('Movies:', movies));
