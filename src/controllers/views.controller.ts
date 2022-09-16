import { Request, Response } from 'express';

import { getAllImages } from '../helpers/image.helper';
import { mapImageWithPath } from '../util';
import path from 'path';

/**
 * View controller for the resizer page
 * @async
 * @param {Request} req -- http request to handle
 * @param {Response} res -- http response to send
 * @returns {Promise<void>}
 */
const resizer = async (req: Request, res: Response): Promise<void> => {
  // get all full images to be the options for <select>
  const original = await getAllImages('full');

  // get all resized images for display
  const thumbs = await getAllImages('thumbs');

  // prepare both full & thumbs object for rendering
  const mapped = original?.map(mapImageWithPath);
  const resized = thumbs
    ?.filter((img) => {
      const file = path.parse(img);
      const arr = file.name.split('_');
      return !(arr[1] === 'converted');
    })
    .map(mapImageWithPath);

  // render page with full & thumbs
  res.render('index', {
    original: mapped,
    thumbs: resized,
    year: new Date().getFullYear()
  });
};

/**
 * View controller for the converted page
 * @async
 * @param {Request} req -- http request to handle
 * @param {Response} res -- http response to send
 * @returns {Promise<void>}
 */
const converter = async (req: Request, res: Response): Promise<void> => {
  // get all full images to be the options for <select>
  const original = await getAllImages('full');

  // get all converted images for display
  const thumbs = await getAllImages('thumbs');

  // prepare both full & thumbs object for rendering
  const mapped = original?.map(mapImageWithPath);
  const converted = thumbs
    ?.filter((img) => {
      const file = path.parse(img);
      const arr = file.name.split('_');
      return arr[1] === 'converted';
    })
    .map(mapImageWithPath);

  // render page with full & thumbs
  res.render('converter', {
    original: mapped,
    thumbs: converted,
    year: new Date().getFullYear()
  });
};

export default {
  resizer,
  converter
};
