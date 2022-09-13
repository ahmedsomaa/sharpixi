import { ConvertQuery, ImageFile, ResizeQuery, SharpResult } from '../interfaces';

import path from 'path';
import { resolveToSourceAndTarget } from '../helpers/image.helper';
import sharp from 'sharp';

/**
 * resize an image with the given sizes
 * @param {ResizeQuery} {filename, width, height} - filename, width, height to use for reszie
 * @returns {Promise<SharpResult>} the new resized file path
 */
export const resize = async ({ width, height, filename }: ResizeQuery): Promise<SharpResult> => {
  try {
    const file = path.parse(filename);
    const { source, target }: ImageFile = resolveToSourceAndTarget(
      filename,
      `${file.name}_${height}x${width}${file.ext}`
    );
    await sharp(source)
      .resize(+width, +height)
      .toFile(target);
    return { data: target, success: true };
  } catch (error) {
    return {
      success: false,
      data: `Failed to resize image`,
      errors: { 'sharp::resize': [{ msg: (error as Error).message }] }
    };
  }
};

/**
 * convert an image to a given format
 * @param {ConvertQuery} {filename, format} -- filename & format to use for convert
 * @returns {Promise<SharpResult>} the new converted image file path
 */
export const convert = async ({ filename, format }: ConvertQuery): Promise<SharpResult> => {
  try {
    const file = path.parse(filename);
    const { source, target }: ImageFile = resolveToSourceAndTarget(
      filename,
      `${file.name}_converted.${format}`
    );
    await sharp(source).toFormat(format).toFile(target);
    return { success: true, data: target };
  } catch (error) {
    return {
      success: false,
      data: `Failed to convert image to .${format}`,
      errors: { 'sharp::toFormat': [{ msg: (error as Error).message }] }
    };
  }
};

export default {
  resize,
  convert
};
