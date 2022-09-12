import { Request, Response } from 'express';
import {
  getAllImages,
  imageExists,
  resizeImage,
  resolveImageDirectoryPath
} from '../helpers/image.helper';

import { ImageQueryString } from '../interfaces';
import _ from 'lodash';
import path from 'path';
import { validationResult } from 'express-validator';

const resize = async (req: Request, res: Response) => {
  // get query params validaion errors
  const result = validationResult(req).formatWith(({ param, msg }) => ({
    param,
    msg
  }));

  // check for empty query string
  if (_.isEmpty(req.query)) {
    return res
      .status(400)
      .render('error', { code: 400, message: 'Query string cannot be empty'.toUpperCase() });
    // check for validation error
  } else if (!result.isEmpty()) {
    const errors = result.array();
    const grouped = _.groupBy(errors, ({ param }) => param);
    return res.status(422).render('error', {
      code: 422,
      message: 'Invalid Values for Query String'.toUpperCase(),
      errors: grouped
    });
  }

  // desirialize query string
  const { filename, width, height } = req.query as unknown as ImageQueryString;

  // check for file in public/images/thumbs
  const inThumbs = await imageExists(`${filename}_${height}x${width}`, 'thumbs');

  if (!inThumbs) {
    const inOriginal = await imageExists(filename, 'original');
    return inOriginal
      ? res.sendFile(
          await resizeImage({
            filename: inOriginal,
            width: +width,
            height: +height
          })
        )
      : res
          .status(404)
          .render('error', { code: 404, message: 'File does not exist'.toUpperCase() });
  } else {
    return res.sendFile(path.join(resolveImageDirectoryPath('thumbs'), inThumbs));
  }
};

const convert = async (req: Request, res: Response) => {
  // get query params validaion errors
  const result = validationResult(req).formatWith(({ param, msg }) => ({
    param,
    msg
  }));

  // check for empty query string
  if (_.isEmpty(req.query)) {
    return res
      .status(400)
      .render('error', { code: 400, message: 'Query string cannot be empty'.toUpperCase() });
    // check for validation error
  } else if (!result.isEmpty()) {
    const errors = result.array();
    const grouped = _.groupBy(errors, ({ param }) => param);
    return res.status(422).render('error', {
      code: 422,
      message: 'Invalid Values for Query String'.toUpperCase(),
      errors: grouped
    });
  }
  res.send('Converted');
};

export default {
  resize,
  convert
};
