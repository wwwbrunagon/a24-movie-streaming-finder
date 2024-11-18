import dotenv from 'dotenv';
import { config } from '../config';
dotenv.config(); 

const TMDB_BASE_URL = config.tmdb.baseUrl;
const API_KEY = config.tmdb.apiKey;


if (!TMDB_BASE_URL || !API_KEY) {
    throw new Error('Missing required environment variables');
}
