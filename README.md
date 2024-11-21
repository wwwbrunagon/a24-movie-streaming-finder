# Movie Streaming Finder

TypeScript and Node.js project that fetches and displays movie information from Studios, using the TMDB API to locate which streaming services offer these movies.

## API Used

## Features Implemented

1. API Integration:

- I integrated the project with - [TMDB API](https://developers.themoviedb.org/3) (The Movie Database) API to:
- - Fetch a list of movies produced by Studio A24.
- - Search for streaming services where these movies are available.

2. Endpoints Developed:

- GET `/api/studios`:
- - Fetches studio data from TMDB and saves the data to a file named studios.json.
- - This endpoint provides a confirmation message once the studio data is successfully fetched and saved.

- GET `/api/studios/movies?name=A24`:
- - Uses the previously saved studio data from studios.json to search for Studio A24 (for exemple) and fetch a list of movies produced by it.
- - The data returned includes movies associated with Studio A24, including where they are streaming.

3. File System Operations:

- Persistent Data Storage: We implemented file handling to persistently store fetched studios in a local JSON file `studios.json`, allowing for future use without repeated API calls.

4. Error Handling:

- Custom Error Handling Middleware to provide consistent error messages for any issues encountered.
- Specific error responses like `400 Bad Request` when required parameters are missing and `500 Internal Server Error` for server-side problems

5. Recursion and TypeScript Concepts:

- I used recursive functions to search within nested studio data, supporting scenarios with potential child studios.
- Leveraged advanced TypeScript features, including utility types, generic types, and Promises, to enhance type safety and code quality.

## Key Tools & Technologies Used

- Express.js: To create and manage RESTful APIs.
- TypeScript: For static type checking and advanced type features such as generics, ensuring code robustness and maintainability.
- Axios: For making HTTP requests to the TMDB API.
- File System (fs): Used Node's `fs/promises` module to manage reading and writing data to the JSON file `studios.json`.
- Custom Error Classes: Defined a `CustomError` class to provide detailed, typed error handling throughout the project.

# # Project Structure
The project structure evolved into:
```project/
├── src/
│   ├── api/
│   │   └── fetchFromTMDB.ts        // Function to interact with TMDB API
│   ├── errors/
│   │   └── CustomError.ts          // Custom error class for better error handling
│   ├── interfaces/
│   │   └── movie.ts                // Interfaces to describe data types
│   │   └── studio.ts               // Interface for studios
│   ├── middleware/
│   │   └── errorHandlerMiddleware.ts  // Middleware to handle errors consistently
│   ├── services/
│   │   └── studioService.ts        // Functions to fetch/save studios and retrieve movie data
│   └── index.ts                    // Main server file with route definitions
├── data/
│   └── studios.json                // Persistent storage of fetched studios data
```