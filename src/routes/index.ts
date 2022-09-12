import express, { Request, Response } from 'express';

import imageRoutes from './api/image';
import path from 'path';

const indexRoute = express.Router();

// main router
indexRoute.get('/', (req: Request, res: Response) => {
  res.render(path.join(__dirname, '..', '..', 'public', 'index'));
});

// image router
indexRoute.use('/images', imageRoutes);

export default indexRoute;
