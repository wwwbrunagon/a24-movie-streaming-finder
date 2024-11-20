import express from 'express';
import movieRoutes from './routes/routes';

const app = express();
app.use(express.json());
app.use('/api', movieRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
