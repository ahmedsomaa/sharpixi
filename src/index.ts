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
import { resolveImageDirectoryPath } from './helpers/image';

// configure dotenv
dotenv.config();

// Create express app
const app = express();
const PORT = process.env.PORT || 3000;

// set the view engine to ejs
app.set('view engine', 'ejs');

// logger
app.use(morgan('common'));

// disable x-powered-by in browser & other security issues
app.use(helmet());

// CORS
app.use(cors());

// compression
app.use(compression());

// serve favicon
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));

// use application routes
app.use(indexRouter);

// start app
app.listen(PORT, (): void => {
  const dir = resolveImageDirectoryPath('thumbs');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  console.log(`Server started at http://localhost:${PORT} ...`);
});

export default app;
