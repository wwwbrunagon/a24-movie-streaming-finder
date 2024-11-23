import express from 'express';
import studioRoutes from './routes/studioRoutes';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware';

const app = express();
const PORT = 3000;

app.use('/api', studioRoutes);

app.use(errorHandlerMiddleware);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
