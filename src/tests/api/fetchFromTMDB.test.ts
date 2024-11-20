import { fetchFromTMDB } from '../../api/fetchFromTMDB';
import { StreamingInfo } from '../../interfaces/movie';
import { getStreamingInfo } from '../../services/movieService';
         
// Mock the fetchFromTMDB function
jest.mock('../api/fetchFromTMDB');

describe('getStreamingInfo', () => {
  const mockedFetchFromTMDB = fetchFromTMDB as jest.Mock;

  it('should return StreamingInfo[] when data is valid', async () => {
    // Mock the API response
    const mockResponse = {
      results: {
        Netflix: {
          link: 'https://www.netflix.com/movie/12345',
          providerName: 'Netflix',
        },
        Hulu: {
          link: 'https://www.hulu.com/movie/67890',
          providerName: 'Hulu',
        },
      },
    };

    mockedFetchFromTMDB.mockResolvedValueOnce(mockResponse);

    const movieId = 1;
    const result = await getStreamingInfo(movieId);

    const expected: StreamingInfo[] = [
      { providerName: 'Netflix', link: 'https://www.netflix.com/movie/12345' },
      { providerName: 'Hulu', link: 'https://www.hulu.com/movie/67890' },
    ];

    expect(result).toEqual(expected);
    expect(mockedFetchFromTMDB).toHaveBeenCalledWith(
      `movie/${movieId}/watch/providers`
    );
  });

  it('should handle nested ProviderDetails.link', async () => {
    const mockResponse = {
      results: {
        Disney: {
          link: { link: 'https://www.disneyplus.com/movie/54321' },
          providerName: 'Disney',
        },
      },
    };

    mockedFetchFromTMDB.mockResolvedValueOnce(mockResponse);

    const movieId = 2;
    const result = await getStreamingInfo(movieId);

    const expected: StreamingInfo[] = [
      {
        providerName: 'Disney',
        link: 'https://www.disneyplus.com/movie/54321',
      },
    ];

    expect(result).toEqual(expected);
    expect(mockedFetchFromTMDB).toHaveBeenCalledWith(
      `movie/${movieId}/watch/providers`
    );
  });

  it('should handle missing link gracefully', async () => {
    const mockResponse = {
      results: {
        HBO: { link: null, providerName: 'HBO' },
      },
    };

    mockedFetchFromTMDB.mockResolvedValueOnce(mockResponse);

    const movieId = 3;
    const result = await getStreamingInfo(movieId);

    const expected: StreamingInfo[] = [{ providerName: 'HBO', link: '' }];

    expect(result).toEqual(expected);
    expect(mockedFetchFromTMDB).toHaveBeenCalledWith(
      `movie/${movieId}/watch/providers`
    );
  });

  it('should return an empty array if results are empty', async () => {
    const mockResponse = { results: {} };

    mockedFetchFromTMDB.mockResolvedValueOnce(mockResponse);

    const movieId = 4;
    const result = await getStreamingInfo(movieId);

    expect(result).toEqual([]);
    expect(mockedFetchFromTMDB).toHaveBeenCalledWith(
      `movie/${movieId}/watch/providers`
    );
  });

  it('should throw an error if fetchFromTMDB fails', async () => {
    mockedFetchFromTMDB.mockRejectedValueOnce(new Error('API Error'));

    const movieId = 5;

    await expect(getStreamingInfo(movieId)).rejects.toThrow('API Error');
    expect(mockedFetchFromTMDB).toHaveBeenCalledWith(
      `movie/${movieId}/watch/providers`
    );
  });
});
