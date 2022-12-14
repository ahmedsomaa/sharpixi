import * as dotenv from 'dotenv';

import compression from 'compression';
import cors from 'cors';
import express from 'express';
import favicon from 'serve-favicon';
import fs from 'fs';
import helmet from 'helmet';
import indexRouter from './routes';
import morgan from 'morgan';
import path from 'path';
import { resolveImageDirectoryPath } from './helpers/image.helper';

// configure dotenv
dotenv.config();

// Create express app
const app = express();
const PORT = process.env.PORT || 3000;

// set the view engine to hbs
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// logger
app.use(morgan('common'));

// disable x-powered-by in browser & other security issues
app.use(helmet());

// CORS
app.use(cors());

// compression
app.use(compression());

// serve favicon
app.use(favicon(path.join(__dirname, '..', 'images', 'favicon.ico')));

// serve static image files
app.use(express.static('images'));

// use application routes
app.use(indexRouter);

// start app
app.listen(PORT, (): void => {
  const dir = resolveImageDirectoryPath('thumbs');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
    // eslint-disable-next-line no-console
    console.log('[fs::mkdirSync] successfull created thumbs directory.');
  }
  // eslint-disable-next-line no-console
  console.log(`Server started at http://localhost:${PORT}...`);
});

export default app;
