import express from 'express';
import imageRoutes from './api/image';
import indexController from '../controllers/index';

const indexRoute = express.Router();

// image router
indexRoute.use('/images', imageRoutes);

// main router
indexRoute.get('/', indexController.homePage);

export default indexRoute;
