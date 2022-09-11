import * as dotenv from 'dotenv';

import cors from 'cors';
import express from 'express';
import favicon from 'serve-favicon';
import helmet from 'helmet';
import indexRouter from './routes';
import morgan from 'morgan';
import path from 'path';

// configure dotenv
dotenv.config();

// Create express app
const app = express();
const PORT = process.env.PORT || 3000;

// logger
app.use(morgan('common'));

// disable x-powered-by in browser & other security issues
app.use(helmet());

// CORS
app.use(cors());

// serve favicon
app.use(favicon(path.join(__dirname, '..', 'public', 'favicon.ico')));

// use application routes
app.use(indexRouter);

// start app
app.listen(PORT, () => {
  console.log(`Server started at http://localhost:${PORT} ...`);
});
