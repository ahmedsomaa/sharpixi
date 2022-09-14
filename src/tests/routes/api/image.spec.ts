import app from '../../../index';
import request from 'supertest';

describe('-- Image Router Tests Suite', (): void => {
  describe('--- GET /api/resize Request', (): void => {
    it('should return 400 for empty query string', async (): Promise<void> => {
      const { type } = await request(app).get('/api/resize');
      expect(400);
      expect(type).toEqual('text/html');
    });

    it('should return 422 for invalid query string', async (): Promise<void> => {
      const { type } = await request(app).get('/api/resize?filename=&height=four&width=_4');
      expect(422);
      expect(type).toEqual('text/html');
    });

    it('should return 404 if image does not exist', async (): Promise<void> => {
      const { type } = await request(app).get('/api/resize?filename=myimage&height=200&width=200');
      expect(404);
      expect(type).toEqual('text/html');
    });

    it('should return 200 with resized image for valid query string', async (): Promise<void> => {
      const { type } = await request(app).get(
        `/api/resize?filename=encenadaport&width=600&height=400`
      );
      expect(200);
      expect(type).toEqual('image/jpeg');
    });

    it('should return 200 with resized image for the same query string', async (): Promise<void> => {
      const { type } = await request(app).get(
        `/api/resize?filename=encenadaport&width=600&height=400`
      );
      expect(200);
      expect(type).toEqual('image/jpeg');
    });
  });

  describe('--- GET /api/convert Request', (): void => {
    it('should return 400 for empty query string', async (): Promise<void> => {
      const { type } = await request(app).get('/api/convert');
      expect(400);
      expect(type).toEqual('text/html');
    });

    it('should return 422 for invalid query string', async (): Promise<void> => {
      const { type } = await request(app).get('/api/convert?filename=&format=hello');
      expect(422);
      expect(type).toEqual('text/html');
    });

    it('should return 404 if image does not exist', async (): Promise<void> => {
      const { type } = await request(app).get('/api/convert?filename=myimage&format=png');
      expect(404);
      expect(type).toEqual('text/html');
    });

    it('should return 200 with converted image for valid query string', async (): Promise<void> => {
      const { type } = await request(app).get(`/api/convert?filename=fjord&format=png`);
      expect(200);
      expect(type).toEqual('image/png');
    });

    it('should return 200 with resized image for the same query string', async (): Promise<void> => {
      const { type } = await request(app).get(`/api/convert?filename=fjord&format=png`);
      expect(200);
      expect(type).toEqual('image/png');
    });
  });
});
