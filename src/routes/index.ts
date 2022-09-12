import express, { Request, Response } from 'express';

import imageRoutes from './api/image';

const indexRoute = express.Router();

// image router
indexRoute.use('/images', imageRoutes);

// main router
indexRoute.get('/', (req: Request, res: Response) => res.render('index'));

export default indexRoute;
