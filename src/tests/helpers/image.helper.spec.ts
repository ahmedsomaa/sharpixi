import { getAllImages, imageExists, resolveImageDirectoryPath } from '../../helpers/image.helper';

describe('-- Image helper Tests Suite', (): void => {
  describe('--- imageExists method', (): void => {
    const filename = 'fjord.jpg';
    it('sholud return string if file exists in directory', async (): Promise<void> => {
      const resolved = await imageExists('fjord', 'original');
      expect(resolved).toEqual(filename);
    });
    it('should return empty string if file does not exist in directory', async (): Promise<void> => {
      const resolved = await imageExists('fjord', 'thumbs');
      expect(resolved).toEqual('');
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
});
