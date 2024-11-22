import express from 'express';
import studioRoutes from './routes/studioRoutes';
import companyRoutes from './routes/companyRoutes';
import { errorHandlerMiddleware } from './middleware/errorHandlerMiddleware';
import { logger } from './utils/logger';

const app = express();
const PORT = 6000;

app.use('/api', studioRoutes);
app.use('/api', companyRoutes);
app.use(errorHandlerMiddleware);
app.listen(PORT, () => {
	logger.info(`Server is running on http://localhost:${PORT}`);
});
