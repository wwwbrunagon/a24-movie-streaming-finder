import { getStudioA24Movies, getStreamingInfo } from "../services/movieService";

jest.mock("../utils/api", () => ({
  fetchFromTMDB: jest.fn(),
}));

const { fetchFromTMDB } = require("../utils/api");

describe("Movie Service", () => {
  it("fetches Studio A24 movies", async () => {
    fetchFromTMDB.mockResolvedValueOnce({
      results: [
        {
          id: 1,
          title: "Movie 1",
          release_date: "2024-01-01",
          poster_path: "/path.jpg",
        },
      ],
    });
    const movies = await getStudioA24Movies();
    expect(movies).toEqual([
      {
        id: 1,
        title: "Movie 1",
        releaseDate: "2024-01-01",
        posterPath: "/path.jpg",
      },
    ]);
  });

  it("fetches streaming info for a movie", async () => {
    fetchFromTMDB.mockResolvedValueOnce({
      results: { Netflix: { link: "http://netflix.com" } },
    });
    const streamingInfo = await getStreamingInfo(1);
    expect(streamingInfo).toEqual([
      { providerName: "Netflix", link: "http://netflix.com" },
    ]);
  });
});
