import express from 'express';
import imageController from '../../controllers/image';
import { queryValidator } from '../../middleware';

const imageRoutes = express.Router();

imageRoutes.get('/all', imageController.all);
imageRoutes.get('/', queryValidator, imageController.resize);

export default imageRoutes;
