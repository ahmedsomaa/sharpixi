import app from '../../index';
import request from 'supertest';

describe('-- Main Router Tests Suite', (): void => {
  describe('--- GET / Request', (): void => {
    it('should return 200 and html document', async (): Promise<void> => {
      const { type } = await request(app).get('/');
      expect(200);
      expect(type).toBe('text/html');
    });
  });
});
