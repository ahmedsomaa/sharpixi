import { Request, Response } from 'express';

import { getAllImages } from '../helpers/image.helper';
import { mapImageWithPath } from '../util';
import path from 'path';

const resizer = async (req: Request, res: Response) => {
  const original = await getAllImages('original');
  const thumbs = await getAllImages('thumbs');
  const mapped = original?.map(mapImageWithPath);
  const resized = thumbs
    ?.filter((img) => {
      const file = path.parse(img);
      const arr = file.name.split('_');
      return !(arr[1] === 'converted');
    })
    .map(mapImageWithPath);

  res.render('index', {
    original: mapped,
    thumbs: resized,
    year: new Date().getFullYear()
  });
};

const converter = async (req: Request, res: Response) => {
  const original = await getAllImages('original');
  const thumbs = await getAllImages('thumbs');
  const mapped = original?.map(mapImageWithPath);
  const converted = thumbs
    ?.filter((img) => {
      const file = path.parse(img);
      const arr = file.name.split('_');
      return arr[1] === 'converted';
    })
    .map(mapImageWithPath);

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
