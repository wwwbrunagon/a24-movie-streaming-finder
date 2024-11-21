import fs from 'fs/promises';
import path from 'path';
import { fetchFromTMDB } from '../api/fetchFromTMDB';
import { CustomError } from '../errors/CustomError';
import { Studio } from '../interfaces/studio';

/**
 * Ensures that the data directory exists before writing the studios to a file.
 */
const ensureDataDirectoryExists = async () => {
  const dataDir = path.resolve(__dirname, '../../data');
  try {
    await fs.access(dataDir);
    console.log('Data directory already exists.');
  } catch (err) {
    console.log('Data directory does not exist. Creating...');
    await fs.mkdir(dataDir);
    console.log('Data directory created successfully.');
  }
};

/**
 * Fetches a list of studios using search and saves them to a JSON file.
 */
export const fetchAndSaveStudioList = async (): Promise<void> => {
  try {
    console.log('Ensuring data directory exists...');
    await ensureDataDirectoryExists();

    console.log('Attempting to fetch studio list from TMDB...');

    // Fetch studio data using search/company endpoint
    const response = await fetchFromTMDB<{ results: Studio[] }>(
      'search/company',
      {
        query: 'A24',
      }
    );

    console.log('Raw response from TMDB:', JSON.stringify(response, null, 2));

    // Validate the response
    if (!response || !response.results || response.results.length === 0) {
      throw new CustomError(
        'No studios returned from TMDB. Please verify the API endpoint and parameters.',
        500
      );
    }

    console.log(`Fetched ${response.results.length} studios from TMDB.`);

    // Map studios to lightweight structure
    const studios: Studio[] = response.results.map((studio) => ({
      id: studio.id,
      name: studio.name,
      children: studio.children || [],
    }));

    const filePath = path.resolve(__dirname, '../../data/studios.json');
    console.log(`Saving studios to file: ${filePath}`);

    // Write the studios to the file
    await fs.writeFile(filePath, JSON.stringify(studios, null, 2));
    console.log(`Studios saved successfully to ${filePath}`);
  } catch (err) {
    console.error('Error in fetchAndSaveStudioList:', err);
    throw new CustomError('Failed to fetch and save studio list.', 500);
  }
};
