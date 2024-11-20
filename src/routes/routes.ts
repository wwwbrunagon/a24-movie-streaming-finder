import { Router } from 'express';
import { getStudioA24Movies, getStreamingInfo } from '../services/movieService';
import { errorHandlerMiddleware } from '../middleware/errorHandlerMiddleware';

const router = Router();
router.use(errorHandlerMiddleware);

router.get('/movies', async (_, res) => {
  const movies = await getStudioA24Movies();
  res.json(movies);
});

router.get('/movies/:id/streaming', async (req, res) => {
  const streamingInfo = await getStreamingInfo(Number(req.params.id));
  res.json(streamingInfo);
});

export default router;
