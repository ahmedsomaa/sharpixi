import app from '../../../index';
import supertest from 'supertest';

describe('-- Image Router Tests Suite', (): void => {
  const request = supertest(app);

  describe('--- GET /api/resize Request', (): void => {
    it('should return 400 for empty query string', async (): Promise<void> => {
      const response = await request.get('/api/resize');
      expect(response.status).toEqual(400);
      expect(response.type).toEqual('text/html');
    });

    it('should return 422 for invalid query string parameters', async (): Promise<void> => {
      const response = await request.get('/api/resize?filename=&height=four&width=_4');
      expect(response.status).toEqual(422);
      expect(response.type).toEqual('text/html');
    });

    it('should return 404 if image does not exist', async (): Promise<void> => {
      const response = await request.get('/api/resize?filename=myimage&height=200&width=200');
      expect(response.status).toEqual(404);
      expect(response.type).toEqual('text/html');
    });

    it('should return 200 with resized image if image exists', async (): Promise<void> => {
      const images = ['encenadaport', 'fjord', 'icelandwaterfall', 'palmtunnel', 'santamonica'];
      images.forEach(async (img) => {
        const resp = await request.get(`/api/resize?filename=${img}&width=600&height=400`);
        expect(resp.status).toEqual(200);
        expect(resp.type).toEqual('image/jpeg');
      });
    });
  });

  describe('--- GET /api/convert Request', (): void => {
    it('should return 400 for empty query string', async (): Promise<void> => {
      const response = await request.get('/api/convert');
      expect(response.status).toEqual(400);
      expect(response.type).toEqual('text/html');
    });

    it('should return 422 for invalid query string parameters', async (): Promise<void> => {
      const response = await request.get('/api/convert?filename=&format=hello');
      expect(response.status).toEqual(422);
      expect(response.type).toEqual('text/html');
    });

    it('should return 404 if image does not exist', async (): Promise<void> => {
      const response = await request.get('/api/convert?filename=myimage&format=png');
      expect(response.status).toEqual(404);
      expect(response.type).toEqual('text/html');
    });

    it('should return 200 with converted image if image exists', async (): Promise<void> => {
      const images = ['encenadaport', 'fjord', 'icelandwaterfall', 'palmtunnel', 'santamonica'];
      images.forEach(async (img) => {
        const resp = await request.get(`/api/convert?filename=${img}&format=png`);
        expect(resp.status).toEqual(200);
        expect(resp.type).toEqual('image/png');
      });
    });
  });
});
