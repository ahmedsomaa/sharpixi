import { ConvertQuery, ResizeQuery, SharpResult } from '../../interfaces';
import { imageExists, resolveImageDirectoryPath } from '../../helpers/image.helper';
import path, { ParsedPath } from 'path';

import SharpService from '../../services/sharp.service';
import fs from 'fs';

describe('-- Sharp Service Tests Suite', (): void => {
  const fullDirectory = resolveImageDirectoryPath('full');
  const thumbsDirectroy = resolveImageDirectoryPath('thumbs');

  describe('--- Resize Service', (): void => {
    it('should delete the resized file if exists & create a new fresh one', async (): Promise<void> => {
      const { filename, height, width }: ResizeQuery = {
        filename: 'fjord.jpg',
        width: 400,
        height: 600
      };
      const file: ParsedPath = path.parse(filename);
      const { success, data }: SharpResult = await imageExists(
        `${filename}_${height}x${width}`,
        'thumbs'
      );
      if (success) fs.unlinkSync(path.join(fullDirectory, data));
      const resizeResult: SharpResult = await SharpService.resize({ filename, height, width });
      expect(resizeResult.success).toEqual(true);
      expect(resizeResult.data).toEqual(
        path.join(thumbsDirectroy, `${file.name}_${height}x${width}${file.ext}`)
      );
    });
  });

  describe('--- Convert Service', (): void => {
    it('should delete the converted file if exists & create a new fresh one', async (): Promise<void> => {
      const { filename, format }: ConvertQuery = { filename: 'fjord.jpg', format: 'webp' };
      const file: ParsedPath = path.parse(filename);
      const { data }: SharpResult = await imageExists(`${file.name}_converted`, 'thumbs');
      const files = data.split(',');
      const filtered = files.filter((f) => f.split('.')[1] === format);
      if (filtered.length !== 0) {
        fs.unlinkSync(path.join(thumbsDirectroy, filtered[0]));
      }

      const convertResult: SharpResult = await SharpService.convert({ filename, format });
      expect(convertResult.success).toEqual(true);
      expect(convertResult.data).toEqual(
        path.join(thumbsDirectroy, `${file.name}_converted.${format}`)
      );
    });
  });
});
