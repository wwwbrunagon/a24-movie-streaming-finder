import dotenv from 'dotenv';
dotenv.config();

export const config = {
    tmdb: {
        baseUrl: process.env.TMDB_BASE_URL || '',
        apiKey: process.env.TMDB_API_KEY || '',
    },
};

if (!config.tmdb.baseUrl || !config.tmdb.apiKey) {
    throw new Error('Missing required TMDB configuration variables');
}
