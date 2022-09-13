import ViewsController from '../controllers/views.controller';
import express from 'express';
import imageRoutes from './api/image';
import viewsController from '../controllers/views.controller';

const indexRoute = express.Router();

// api
indexRoute.use('/api', imageRoutes);

// views
indexRoute.get('/', ViewsController.resizer);
indexRoute.get('/converter', viewsController.converter);

export default indexRoute;
