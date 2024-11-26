import express from 'express';
import { logger } from './utils/logger';
import errorHandlerMiddleware from './middleware/errorHandlerMiddleware';
import companyRouter from './routes/companyRouter';

const app = express();
const PORT = 6000;

app.use('/api', companyRouter);
app.use(errorHandlerMiddleware);
app.listen(PORT, () => {
	logger.info(`Server is running on http://localhost:${PORT}`);
});
