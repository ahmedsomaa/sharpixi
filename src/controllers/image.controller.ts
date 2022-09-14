import { ConvertQuery, ResizeQuery, SharpResult } from '../interfaces';
import { Request, Response } from 'express';
import { imageExists, resolveImageDirectoryPath } from '../helpers/image.helper';

import SharpService from '../services/sharp.service';
import _ from 'lodash';
import path from 'path';
import { validationResult } from 'express-validator';

/**
 * Image Controller for Resize Route
 * @param {Request} req -- http request object to handle
 * @param {Response} res -- http response to send
 * @returns {void}
 */
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
  const { filename, width, height } = req.query as unknown as ResizeQuery;

  // check for file in images/thumbs
  const checkThumbs: SharpResult = await imageExists(`${filename}_${height}x${width}`, 'thumbs');

  if (checkThumbs.success) {
    // return from thumbs
    return res.sendFile(path.join(resolveImageDirectoryPath('thumbs'), checkThumbs.data));
  } else {
    // found in original, resize it
    const checkOriginal: SharpResult = await imageExists(filename, 'original');

    if (checkOriginal.success) {
      // call sharp service to resize image
      const resizePromise: SharpResult = await SharpService.resize({
        filename: checkOriginal.data,
        width,
        height
      });
      if (resizePromise.success) {
        // image resize -> success -> send resized image
        return res.sendFile(resizePromise.data);
      } else {
        // failed to resize image
        // let the user know
        return res.status(400).render('error', {
          code: 400,
          errors: resizePromise.errors,
          message: resizePromise.data.toUpperCase()
        });
      }
    } else {
      // image doesn't exist
      return res
        .status(404)
        .render('error', { code: 404, message: 'File does not exist'.toUpperCase() });
    }
  }
};

/**
 * Image Controller for Convert Route
 * @param {Request} req -- http request object to handle
 * @param {Response} res -- http response to send
 * @returns {void}
 */
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

  // desirialize query string
  const { filename, format } = req.query as unknown as ConvertQuery;
  // check for file in images/thumbs
  const checkThumbs: SharpResult = await imageExists(`${filename}_converted`, 'thumbs');
  if (checkThumbs.success) {
    // return from thumbs
    return res.sendFile(
      path.join(
        resolveImageDirectoryPath('thumbs'),
        checkThumbs.data
          .split(',')
          .filter((img) => img.split('.')[1] === format)
          .toString()
      )
    );
  } else {
    // found in original, resize it
    const checkOriginal: SharpResult = await imageExists(filename, 'original');

    if (checkOriginal.success) {
      const convertPromise: SharpResult = await SharpService.convert({
        filename: checkOriginal.data,
        format
      });
      if (convertPromise.success) {
        return res.sendFile(convertPromise.data);
      } else {
        return res.status(400).render('error', {
          code: 400,
          errors: convertPromise.errors,
          message: convertPromise.data.toUpperCase()
        });
      }
    } else {
      return res
        .status(404)
        .render('error', { code: 404, message: 'File does not exist'.toUpperCase() });
    }
  }
};

export default {
  resize,
  convert
};
