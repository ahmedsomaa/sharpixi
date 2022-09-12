import ViewsController from '../controllers/views.controller';
import express from 'express';
import imageRoutes from './api/image';
import viewsController from '../controllers/views.controller';

const indexRoute = express.Router();

// image router
indexRoute.use('/images', imageRoutes);

// main router
indexRoute.get('/', ViewsController.resizer);
indexRoute.get('/converter', viewsController.converter);

export default indexRoute;
