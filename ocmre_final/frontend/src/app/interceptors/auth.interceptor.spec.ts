import { HttpRequest, HttpHandlerFn, HttpHeaders } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { of } from 'rxjs';

describe('AuthInterceptor (HttpInterceptorFn)', () => {
  it('should not add Authorization header on login request', (done) => {
    const loginReq = new HttpRequest('GET', '/api/auth/login');
    const next: HttpHandlerFn = (req) => {
      expect(req.headers.has('Authorization')).toBeFalse();
      done();
      return of({} as any);
    };

    AuthInterceptor(loginReq, next);
  });

  it('should add Authorization header if token exists', (done) => {
    localStorage.setItem('token', 'mock-token');

    const req = new HttpRequest('GET', '/api/roles');
    const next: HttpHandlerFn = (modifiedReq) => {
      expect(modifiedReq.headers.has('Authorization')).toBeTrue();
      expect(modifiedReq.headers.get('Authorization')).toBe('Bearer mock-token');
      done();
      return of({} as any);
    };

    AuthInterceptor(req, next);
  });

  afterEach(() => {
    localStorage.removeItem('token'); // Limpieza después de cada test
  });
});
