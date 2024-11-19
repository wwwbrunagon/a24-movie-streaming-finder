import { Router } from 'express';
import { getStudioA24Movies, getStreamingInfo } from '../services/movieService';

const router = Router();

router.get('/movies', async (_, res) => {
  try {
    const movies = await getStudioA24Movies();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

router.get('/movies/:id/streaming', async (req, res) => {
  try {
    const streamingInfo = await getStreamingInfo(Number(req.params.id));
    res.json(streamingInfo);
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

export default router;


