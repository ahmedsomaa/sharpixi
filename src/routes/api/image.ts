import * as _ from 'lodash';

import express, { Request, Response } from 'express';

import { isEmptyQuery } from '../../util';
import { queryValidator } from '../../middleware';
import { validationResult } from 'express-validator';

const imageRouter = express.Router();

imageRouter.get('/', queryValidator, (req: Request, res: Response) => {
  // get query params validaion errors
  const result = validationResult(req).formatWith(({ param, msg }) => ({
    param,
    msg
  }));
  // check for empty query string
  if (isEmptyQuery(req.query)) {
    return res.send('Query string cannot be empty');

    // check for validation error
  } else if (!result.isEmpty()) {
    const errors = result.array();
    const grouped = _.groupBy(errors, ({ param }) => param);
    return res.json(grouped);
  }

  // query string is not empty & no validation errors
  return res.send('Ok');
});

export default imageRouter;
