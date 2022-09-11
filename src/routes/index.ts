import express, { Request, Response } from 'express';

import path from 'path';

const router = express.Router();

// main router
router.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '..', '..', 'public', 'index.html'));
});

export default router;
