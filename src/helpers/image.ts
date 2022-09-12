import { ImageDirectory, ImageQueryString } from '../interfaces';

import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

/**
 * checks for a file in a given directory
 * async
 * @param {string} filename - name of the file to look for
 * @param {validImageDirectory} directory - name of the directory to look in
 * @returns {Promise<boolean>} if the file is found in the directory or not
 */
export const imageExists = async (filename: string, directory: ImageDirectory): Promise<string> => {
  try {
    const images = await getAllImages(directory);
    if (!images) {
      return '';
    } else {
      return images.filter((image) => image.split('.')[0] === filename).toString();
    }
  } catch {
    return '';
  }
};

/**
 * returns all files in a directory
 * async
 * @param {validImageDirectory} directory - name of the directory to read
 * @returns {Promise<string[] | null>} list of image names in the directory or nothing
 */
export const getAllImages = async (directory: ImageDirectory): Promise<string[] | null> => {
  const resolved = resolveImageDirectoryPath(directory);
  try {
    await fs.access(resolved);
    const images = await await fs.readdir(resolved);
    return images;
  } catch {
    return null;
  }
};

/**
 * resize an image with the given sizes
 * @param {ImageQueryString} - filename, width, height to use for reszie
 * @returns {Promise<string>} the new resized file path
 */
export const resizeImage = async ({
  width,
  height,
  filename
}: ImageQueryString): Promise<string> => {
  try {
    const filePath = path.parse(filename);
    const source = path.join(resolveImageDirectoryPath('original'), filename);
    const target = path.join(
      resolveImageDirectoryPath('thumbs'),
      `${filePath.name}_${height}x${width}${filePath.ext}`
    );
    await sharp(source).resize(width, height).toFile(target);
    return target;
  } catch (error) {
    return '';
  }
};

/**
 * resolves a path for a given directory name
 * @param {validImageDirectory} directory - name of the directorty to resolve its path
 * @returns {string} the resolved path of the given directory
 */
export const resolveImageDirectoryPath = (directory: ImageDirectory): string =>
  path.join(__dirname, '..', '..', 'images', directory);
