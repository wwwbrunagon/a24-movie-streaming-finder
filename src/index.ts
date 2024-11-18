import express from 'express';
import { getMovies } from './services/movieService';

const app = express();
app.use(express.json());

app.get('/movies', async (req, res) => {
    try {
        const movies = await getMovies();
        res.json(movies);
    } catch (error) {
        res.status(500).send({ error });
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
