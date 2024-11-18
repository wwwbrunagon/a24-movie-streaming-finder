
### Context: 
The project aims to provide a centralized interface to search for Studio A24 movies across multiple streaming platforms.
### Tech Stack:
- TypeScript: Core language.
- Node.js: Backend runtime.
- APIs: Use streaming service APIs (e.g., JustWatch, TMDB) to fetch movie data.
- Prominent Design Patterns: Incorporate repository pattern, singleton, and factory pattern.

### Requirements
- Fetch a list of Studio A24 movies from external APIs.
- Search for where these movies are streaming (using APIs from streaming services like JustWatch or TMDB).
- Provide a REST API for client access.
- Implement error handling (e.g., for unavailable services).
- Use TypeScript features like utility types, generic types, and Promises effectively.

```
src/
  ├── index.ts              # Entry point
  ├── services/             # Services (e.g., MovieService)
  ├── utils/                # Helpers, API fetcher
  ├── tests/                # Unit tests
  ├── interfaces/           # TypeScript interfaces
  ├── middlewares/          # Error handling middleware
```



```
@startuml
actor User
rectangle API_Gateway {
    rectangle Movie_Service
    rectangle Streaming_Service_Lookup
    rectangle Cache_Service
}
User -> API_Gateway : Request movie info
API_Gateway -> Cache_Service : Check cache
Cache_Service --> API_Gateway : Cached result / Miss
API_Gateway -> Movie_Service : Fetch movies
Movie_Service -> Streaming_Service_Lookup : Lookup streaming info
Streaming_Service_Lookup -> API_Gateway : Return streaming data
API_Gateway --> User : Respond with results
@enduml
```
![UML](./assets/uml.png)