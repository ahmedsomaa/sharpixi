import { Request, Response } from 'express';
import {
  getAllImages,
  imageExists,
  resizeImage,
  resolveImageDirectoryPath
} from '../helpers/image';

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
    return res.send('Query string cannot be empty');
    // check for validation error
  } else if (!result.isEmpty()) {
    const errors = result.array();
    const grouped = _.groupBy(errors, ({ param }) => param);
    return res.json(grouped);
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
      : res.send('File does not exist');
  } else {
    return res.sendFile(path.join(resolveImageDirectoryPath('thumbs'), inThumbs));
  }
};

const all = async (req: Request, res: Response) => {
  try {
    const images = await getAllImages('original');
    return res.json(images !== null ? images : []);
  } catch (error) {
    return [];
  }
};

export default {
  all,
  resize
};
