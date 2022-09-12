import express from 'express';
import imageController from '../../controllers/image.controller';
import { queryValidator } from '../../middleware';

const imageRoutes = express.Router();

imageRoutes.get('/resize', queryValidator, imageController.resize);

export default imageRoutes;
