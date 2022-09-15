import { ImageDirectory, ImageFile, SharpResult } from '../interfaces';

import fs from 'fs/promises';
import path from 'path';

/**
 * checks for a file in a given directory
 * async
 * @param {string} filename - name of the file to look for
 * @param {validImageDirectory} directory - name of the directory to look in
 * @returns {Promise<boolean>} if the file is found in the directory or not
 */
export const imageExists = async (
  filename: string,
  directory: ImageDirectory
): Promise<SharpResult> => {
  try {
    const images = await getAllImages(directory);
    if (!images) {
      return { success: false, data: `${directory} directory is empty.` };
    } else {
      const hasMatch = images.filter((image) => image.split('.')[0] === filename);
      return hasMatch.length !== 0
        ? { success: true, data: hasMatch.toString() }
        : { success: false, data: 'File does not exist' };
    }
  } catch (error) {
    return {
      success: false,
      data: (error as Error).name,
      errors: { 'imageHelper::imageExists': { msg: (error as Error).message } }
    };
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
 * resolves a path for a given directory name
 * @param {validImageDirectory} directory - name of the directorty to resolve its path
 * @returns {string} the resolved path of the given directory
 */
export const resolveImageDirectoryPath = (directory: ImageDirectory): string =>
  path.join(__dirname, '..', '..', 'images', directory);

/**
 * Resolves a file to source & target paths
 * @param {string} inputFileName - name of the file to resolve to source & target
 * @param {string} outputFileName - name of the preferred output name
 * @returns an object with both source & target paths for an image file
 */
export const resolveToSourceAndTarget = (
  inputFileName: string,
  outputFileName: string
): ImageFile => {
  const source = path.join(resolveImageDirectoryPath('full'), inputFileName);
  const target = path.join(resolveImageDirectoryPath('thumbs'), outputFileName);
  return { source, target };
};
