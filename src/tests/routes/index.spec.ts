import app from '../../index';
import supertest from 'supertest';

describe('-- Main Router Tests Suite', () => {
  const request = supertest(app);

  describe('--- GET / Request', () => {
    it('should return 200', async () => {
      const response = await request.get('/');
      expect(response.statusCode).toBe(200);
    });

    it('should return html document', async () => {
      const response = await request.get('/');
      expect(response.type).toBe('text/html');
    });
  });
});
