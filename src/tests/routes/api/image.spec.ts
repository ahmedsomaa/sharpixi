import app from '../../../index';
import supertest from 'supertest';

describe('-- Image Router Tests Suite', (): void => {
  const request = supertest(app);

  describe('--- GET /images/resize Request', (): void => {
    it('should return 400 for empty query string', async (): Promise<void> => {
      const response = await request.get('/images/resize');
      expect(response.status).toEqual(400);
      expect(response.type).toEqual('text/html');
    });

    it('should return 422 for invalid query string parameters', async (): Promise<void> => {
      const response = await request.get('/images/resize?filename=&height=four&width=_4');
      expect(response.status).toEqual(422);
      expect(response.type).toEqual('text/html');
    });

    it('should return 404 if image does not exist', async (): Promise<void> => {
      const response = await request.get('/images/resize?filename=myimage&height=200&width=200');
      expect(response.status).toEqual(404);
      expect(response.type).toEqual('text/html');
    });

    it('should return 200 with resized image if image exists', async (): Promise<void> => {
      const images = ['encenadaport', 'fjord', 'icelandwaterfall', 'palmtunnel', 'santamonica'];
      images.forEach(async (img) => {
        const resp = await request.get(`/images/resize?filename=${img}&width=600&height=400`);
        expect(resp.status).toEqual(200);
        expect(resp.type).toEqual('image/jpeg');
      });
    });
  });
});
