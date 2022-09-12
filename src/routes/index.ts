import ViewsController from '../controllers/views.controller';
import express from 'express';
import imageRoutes from './api/image';

const indexRoute = express.Router();

// image router
indexRoute.use('/images', imageRoutes);

// main router
indexRoute.get('/', ViewsController.landing);

export default indexRoute;
