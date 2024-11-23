import express from 'express';
import studioRoutes from './routes/studioRoutes';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware';
import Logger from './utils/logger';

const app = express();
const PORT = 3000;

app.use('/api', studioRoutes);
app.use(errorHandlerMiddleware);
app.listen(PORT, () => {
  Logger.info(`Server is running on http://localhost:${PORT}`); // Using Logger here
});
