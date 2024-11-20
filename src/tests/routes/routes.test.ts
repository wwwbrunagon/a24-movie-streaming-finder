import request from 'supertest';
import express from 'express';
import {
  getStreamingInfo,
  getStudioA24Movies,
} from '../../services/movieService';
import router from '../../routes/routes';

jest.mock('../../services/movieService'); // Mock the movie service

const mockedGetStudioA24Movies = getStudioA24Movies as jest.Mock;
const mockedGetStreamingInfo = getStreamingInfo as jest.Mock;

describe('Routes', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use(router);
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET /movies', () => {
    it('should return a list of movies', async () => {
      // Mock the service response
      mockedGetStudioA24Movies.mockResolvedValueOnce([
        {
          id: 1,
          title: 'Movie 1',
          releaseDate: '2022-01-01',
          posterPath: '/poster1.jpg',
        },
        {
          id: 2,
          title: 'Movie 2',
          releaseDate: '2023-01-01',
          posterPath: '/poster2.jpg',
        },
      ]);

      const response = await request(app).get('/movies');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        {
          id: 1,
          title: 'Movie 1',
          releaseDate: '2022-01-01',
          posterPath: '/poster1.jpg',
        },
        {
          id: 2,
          title: 'Movie 2',
          releaseDate: '2023-01-01',
          posterPath: '/poster2.jpg',
        },
      ]);
      expect(mockedGetStudioA24Movies).toHaveBeenCalledTimes(1);
    });

    it('should return a 500 error if the service throws an error', async () => {
      mockedGetStudioA24Movies.mockRejectedValueOnce(
        new Error('Service Error')
      );

      const response = await request(app).get('/movies');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
      expect(mockedGetStudioA24Movies).toHaveBeenCalledTimes(1);
    });
  });

  describe('GET /movies/:id/streaming', () => {
    it('should return streaming information for a given movie ID', async () => {
      // Mock the service response
      mockedGetStreamingInfo.mockResolvedValueOnce([
        { providerName: 'Netflix', link: 'https://netflix.com/movie/1' },
        { providerName: 'Hulu', link: 'https://hulu.com/movie/1' },
      ]);

      const response = await request(app).get('/movies/1/streaming');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([
        { providerName: 'Netflix', link: 'https://netflix.com/movie/1' },
        { providerName: 'Hulu', link: 'https://hulu.com/movie/1' },
      ]);
      expect(mockedGetStreamingInfo).toHaveBeenCalledWith(1);
      expect(mockedGetStreamingInfo).toHaveBeenCalledTimes(1);
    });

    it('should return a 500 error if the service throws an error', async () => {
      mockedGetStreamingInfo.mockRejectedValueOnce(new Error('Service Error'));

      const response = await request(app).get('/movies/1/streaming');

      expect(response.status).toBe(500);
      expect(response.body).toEqual({ error: 'Internal Server Error' });
      expect(mockedGetStreamingInfo).toHaveBeenCalledWith(1);
      expect(mockedGetStreamingInfo).toHaveBeenCalledTimes(1);
    });

    it('should handle invalid movie IDs gracefully', async () => {
      mockedGetStreamingInfo.mockResolvedValueOnce([]);

      const response = await request(app).get('/movies/invalid-id/streaming');

      expect(response.status).toBe(200);
      expect(response.body).toEqual([]);
      expect(mockedGetStreamingInfo).toHaveBeenCalledWith(NaN);
      expect(mockedGetStreamingInfo).toHaveBeenCalledTimes(1);
    });
  });
});
