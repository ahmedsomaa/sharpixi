import app from '../index';
import request from 'supertest';

describe('-- Express App Tests Suits', (): void => {
  it('should serve a favorite icon', async (): Promise<void> => {
    const { type } = await request(app).get('/favicon.ico');
    expect(200);
    expect(type).toBe('image/x-icon');
  });

  it('should use handlebars as the default view engine', (): void => {
    const { settings } = app;
    expect(settings['view engine']).toEqual('hbs');
  });

  it('should serve static files', (): void => {
    const images = ['encenadaport', 'fjord', 'icelandwaterfall', 'palmtunnel', 'santamonica'];
    images.forEach(async (img) => {
      const { type } = await request(app).get(`/original/${img}.jpg`);
      expect(200);
      expect(type).toEqual('image/jpeg');
    });
  });
});
