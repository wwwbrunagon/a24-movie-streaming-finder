import fs from "fs";

interface Secrets {
  TMDB_API_KEY: string;
  TMDB_BASE_URL: string;
}

export function loadSecrets(): Secrets {
    try {
        const secrets = fs.readFileSync("secrets.json", "utf-8");
        return JSON.parse(secrets) as Secrets;
    } catch (error) {
        if (error instanceof Error) {
            console.error('Failed to load secrets.json:', error.message);
        } else {
            console.error('Failed to load secrets.json: An unknown error occurred.');
        }
        process.exit(1); 
    }
}


