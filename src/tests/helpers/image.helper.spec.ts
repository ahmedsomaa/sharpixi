import { ImageFile, SharpResult } from '../../interfaces';
import {
  getAllImages,
  imageExists,
  resolveImageDirectoryPath,
  resolveToSourceAndTarget
} from '../../helpers/image.helper';

describe('-- Image helper Tests Suite', (): void => {
  describe('--- imageExists method', (): void => {
    const filename = 'fjord.jpg';
    it('sholud return string if file exists in directory', async (): Promise<void> => {
      const resolved: SharpResult = await imageExists('fjord', 'original');
      expect(resolved.success).toEqual(true);
      expect(resolved.data).toEqual(filename);
    });
    it('should return empty string if file does not exist in directory', async (): Promise<void> => {
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
    it('sholud return directory path as string', (): void => {
      const directoryPath = resolveImageDirectoryPath('original');
      expect(directoryPath).toEqual(
        'C:\\Users\\ahmedsomaa\\Documents\\Projects\\eg-fwd\\image-processing-api\\images\\original'
      );
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
