import express, { Request, Response } from 'express';

import imageRouter from './api/image';
import path from 'path';

const router = express.Router();

// main router
router.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

// image router
router.use('/images', imageRouter);

export default router;
