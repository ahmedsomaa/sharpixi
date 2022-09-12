import app from '../../index';
import supertest from 'supertest';

describe('Image Router Tests Suite', (): void => {
  const request = supertest(app);

  describe('GET /images Request', (): void => {
    describe('no query string provided', (): void => {
      it('should return 200', async (): Promise<void> => {
        const response = await request.get('/images');
        expect(response.status).toBe(200);
      });
      it('should return text/html', async (): Promise<void> => {
        const response = await request.get('/images');
        expect(response.type).toBe('text/html');
      });
      it('should return "Query string cannot be empty" message', async (): Promise<void> => {
        const response = await request.get('/images');
        expect(response.text).toEqual('Query string cannot be empty');
      });
    });

    describe('filename vaildation', (): void => {
      it('GET /images?filename should return "filename cannot be empty" message', async (): Promise<void> => {
        const response = await request.get('/images?filename');
        const { filename } = response.body;
        expect(filename[0].msg).toEqual('filename cannot be empty');
      });
    });

    describe('height vaildation', (): void => {
      it('GET /images?height should return "height cannot be empty" message', async (): Promise<void> => {
        const response = await request.get('/images?height');
        const { height } = response.body;
        expect(height[0].msg).toEqual('height cannot be empty');
      });

      it('GET /images?height=four should return "height must be a number" message', async (): Promise<void> => {
        const response = await request.get('/images?height=four');
        const { height } = response.body;
        expect(height[0].msg).toEqual('height must be a number');
      });
    });

    describe('width vaildation', (): void => {
      it('GET /images?width should return "width cannot be empty" message', async (): Promise<void> => {
        const response = await request.get('/images?width');
        const { width } = response.body;
        expect(width[0].msg).toEqual('width cannot be empty');
      });

      it('GET /images?width=four should return "wdith must be a number" message', async (): Promise<void> => {
        const response = await request.get('/images?width=four');
        const { width } = response.body;
        expect(width[0].msg).toEqual('width must be a number');
      });
    });
  });
});
