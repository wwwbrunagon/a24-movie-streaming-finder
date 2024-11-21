import { fetchAndSaveStudioList } from './services/studioServices';

(async () => {
  try {
    await fetchAndSaveStudioList();
    console.log('Fetch and save studio list succeeded.');
  } catch (error) {
    console.error('Failed to fetch and save studio list:', error);
  }
})();
