import { convertQueryValidator, resizeQueryValidator } from '../../middleware';

import express from 'express';
import imageController from '../../controllers/image.controller';

const imageRoutes = express.Router();

imageRoutes.get('/resize', resizeQueryValidator, imageController.resize);
imageRoutes.get('/convert', convertQueryValidator, imageController.convert);

export default imageRoutes;
