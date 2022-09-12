import app from '../index';
import supertest from 'supertest';

describe('-- Express App Tests Suits', (): void => {
  const request = supertest(app);
  it('should serve a favorite icon', async (): Promise<void> => {
    const response = await request.get('/favicon.ico');
    expect(response.status).toBe(200);
    expect(response.type).toBe('image/x-icon');
  });

  it('should use handlebars as the default view engine', (): void => {
    expect(app.settings['view engine']).toEqual('hbs');
  });

  it('should serve static files', (): void => {
    const images = ['encenadaport', 'fjord', 'icelandwaterfall', 'palmtunnel', 'santamonica'];
    images.forEach(async (img) => {
      const response = await request.get(`/original/${img}.jpg`);
      expect(response.status).toEqual(200);
      expect(response.type).toEqual('image/jpeg');
    });
  });
});
