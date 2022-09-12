import { Request, Response } from 'express';

import { getAllImages } from '../helpers/image.helper';
import { mapImageWithPath } from '../util';

const landing = async (req: Request, res: Response) => {
  const original = await getAllImages('original');
  const thumbs = await getAllImages('thumbs');
  const mapped = original?.map(mapImageWithPath);
  const resized = thumbs?.map(mapImageWithPath);

  res.render('index', {
    original: mapped,
    thumbs: resized,
    year: new Date().getFullYear()
  });
};

export default {
  landing
};
