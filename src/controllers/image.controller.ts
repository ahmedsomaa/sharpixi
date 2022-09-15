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
    return res.status(400).render('error', {
      code: 400,
      message: 'Query string cannot be empty'.toUpperCase(),
      errors: {
        'api::usage': [
          {
            msg: '/api/resize?filename=string&height=number&width=number'
          }
        ]
      }
    });
    // check for query string validation errors
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

  // look for a resized version in thumbs directory
  const foundInThumbs: SharpResult = await imageExists(`${filename}_${height}x${width}`, 'thumbs');

  if (foundInThumbs.success) {
    // resized version is found, serve it
    return res.sendFile(path.join(resolveImageDirectoryPath('thumbs'), foundInThumbs.data));
  } else {
    // no resized version -> look for original file in the original images directory
    const foundInOriginal: SharpResult = await imageExists(filename, 'original');

    if (foundInOriginal.success) {
      // file is found -> resize it with the given height & width
      const resizePromise: SharpResult = await SharpService.resize({
        filename: foundInOriginal.data,
        width,
        height
      });

      if (resizePromise.success) {
        // resize success -> serve resized image
        return res.sendFile(resizePromise.data);
      } else {
        // image resize failed for some reason, inform user with error message
        return res.status(400).render('error', {
          code: 400,
          errors: resizePromise.errors,
          message: resizePromise.data.toUpperCase()
        });
      }
    } else {
      // inform user file does not exist
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
    return res.status(400).render('error', {
      code: 400,
      message: 'Query string cannot be empty'.toUpperCase(),
      errors: {
        'api::usage': [
          {
            msg: '/api/convert?filename=string&format=png | jpg | avif | jpeg | webp'
          }
        ]
      }
    });
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

  // look for a resized version in thumbs directory
  const searchThumbs: SharpResult = await imageExists(`${filename}_converted`, 'thumbs');
  const foundFiles = searchThumbs.data.split(',');
  const filteredByExtension = foundFiles.filter((file) => file.split('.')[1] === format);

  if (filteredByExtension.length !== 0) {
    // converted version found, server it
    return res.sendFile(path.join(resolveImageDirectoryPath('thumbs'), filteredByExtension[0]));
  } else {
    // no converted version -> look for original file in the original images directory
    const searchOriginal: SharpResult = await imageExists(filename, 'original');

    if (searchOriginal.success) {
      // file is found -> convert it to the given format
      const convertPromise: SharpResult = await SharpService.convert({
        filename: searchOriginal.data,
        format
      });

      if (convertPromise.success) {
        // convert success -> serve converted file
        return res.sendFile(convertPromise.data);
      } else {
        // image convert failed for some reason, inform user with error message
        return res.status(400).render('error', {
          code: 400,
          errors: convertPromise.errors,
          message: convertPromise.data.toUpperCase()
        });
      }
    } else {
      // inform user file does not exist
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
