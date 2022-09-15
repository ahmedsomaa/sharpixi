import { ImageFile, SharpResult } from '../../interfaces';
import {
  getAllImages,
  imageExists,
  resolveImageDirectoryPath,
  resolveToSourceAndTarget
} from '../../helpers/image.helper';

import path from 'path';

describe('-- Image helper Tests Suite', (): void => {
  describe('--- imageExists method', (): void => {
    const filename = 'fjord.jpg';
    it('sholud return file name with extension if file exists in directory', async (): Promise<void> => {
      const resolved: SharpResult = await imageExists('fjord', 'original');
      expect(resolved.success).toEqual(true);
      expect(resolved.data).toEqual(filename);
    });
    it('should return "File does not exist" if file does not exist in directory', async (): Promise<void> => {
      const resolved: SharpResult = await imageExists('fjord', 'thumbs');
      expect(resolved.success).toEqual(false);
      expect(resolved.data).toEqual('File does not exist');
    });
  });

  describe('--- getAllImages method', (): void => {
    it('should return list of 5 images', async (): Promise<void> => {
      const images = await getAllImages('original');
      expect(Array.isArray(images)).toEqual(true);
      expect(images?.length).toEqual(5);
    });
  });

  describe('--- resolveImageDirectoryPath method', (): void => {
    it('sholud return directory full path as string', (): void => {
      const directoryPath = resolveImageDirectoryPath('original');
      const correctPath = path.join(__dirname, '..', '..', '..', 'images', 'original');
      expect(directoryPath).toEqual(correctPath);
      expect(typeof directoryPath).toBe('string');
    });
  });

  describe('--- resolveToSourceAndTarget method', (): void => {
    it('should return an object with source & target keys', (): void => {
      const resolved: ImageFile = resolveToSourceAndTarget('fjord.jpg', 'fjord_converted.jpg');
      expect(Object.keys(resolved)).toEqual(['source', 'target']);
    });
  });
});
