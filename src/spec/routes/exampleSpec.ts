// Using Jasmine together w/ supertest
// https://github.com/jasmine/jasmine-npm/issues/31

import * as request from 'supertest';
import app from './../../app';

describe('Jasmine: Example routes', () => {

  it('should get 200 response from healthCheck', done => {
    request(app)
      .get('/')
      .expect(200)
      .end( (err, res) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

  it('should get 404 from unknown route', done => {
    request(app)
      .get('/asodkoasd9923942ik3koadskoaksda9isd')
      .expect(404)
      .end( (err, res) => {
        if (err) {
          done.fail(err);
        } else {
          done();
        }
      });
  });

});
