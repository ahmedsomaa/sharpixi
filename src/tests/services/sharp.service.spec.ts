import { SharpResult } from '../../interfaces';
import SharpService from '../../services/sharp.service';

describe('-- SharpService Tests Suite', (): void => {
  describe('--- resize service', (): void => {
    it('sholud return an object with success and file path for correct query string', async (): Promise<void> => {
      const resolved: SharpResult = await SharpService.resize({
        filename: 'fjord.jpg',
        width: 200,
        height: 600
      });
      expect(resolved.success).toEqual(true);
      expect(resolved.data).toEqual(
        'C:\\Users\\ahmedsomaa\\Documents\\Projects\\eg-fwd\\image-processing-api\\images\\thumbs\\fjord_600x200.jpg'
      );
    });
  });

  describe('--- convert service', (): void => {
    it('sholud return an object with success and file path for correct query string', async (): Promise<void> => {
      const resolved: SharpResult = await SharpService.convert({
        filename: 'fjord.jpg',
        format: 'png'
      });
      expect(resolved.success).toEqual(true);
      expect(resolved.data).toEqual(
        'C:\\Users\\ahmedsomaa\\Documents\\Projects\\eg-fwd\\image-processing-api\\images\\thumbs\\fjord_converted.png'
      );
    });
  });
});
