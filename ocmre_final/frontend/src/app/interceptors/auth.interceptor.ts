import { HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '../auth/services/auth.service';

let isRefreshing = false;
const refreshTokenSubject = new BehaviorSubject<any>(null);

export const AuthInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem(environment.varToken);
  const refresh = localStorage.getItem(environment.varRefToken);
  const client = localStorage.getItem(environment.client);

  let req = request;
  if (token) {
    req = addToken(req, token);
  }

  const path_current = router.url;
  if (!path_current.includes('/auth')) {
      localStorage.setItem(`path_current_${client}`, path_current);
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && error.error?.codigo === 'E001' && refresh) {
        return handle401Error(req, next, authService);
      } else {
        if (error.status === 401 && typeof error.error === 'object') {
          if (refresh) {
            localStorage.removeItem(environment.varRefToken);
          }
          isRefreshing = false;
          authService.irAppSso();
        }

        if (error.status === 403 && typeof error.error === 'object') {
          const err_ = error.error;
          if ('codigo' in err_ && err_.codigo === 'E010') {
            if (refresh) {
              localStorage.removeItem(environment.varRefToken);
            }
            isRefreshing = false;
            authService.irAppSso();
          }
        }

        if (error.status === 500) {
          const is_refresh = error.url?.indexOf('auth/refresh') ?? -1;
          if (is_refresh >= 0) {
            // toastr.warning('Hay problemas con el API de renovación de token', error.statusText);
            isRefreshing = false;
            authService.irAppSso();
          }
        }
        return throwError(() => error);
      }
    })
  );
};

function addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function handle401Error(request: HttpRequest<any>, next: HttpHandlerFn, authService: AuthService) {
  if (!isRefreshing) {
    isRefreshing = true;
    refreshTokenSubject.next(null);

    return authService.refreshToken().pipe(
      switchMap((token: any) => {
        isRefreshing = false;
        refreshTokenSubject.next(token.access_token);
        return next(addToken(request, token.access_token));
      }),
      catchError(err => {
        isRefreshing = false;
        return throwError(() => err);
      })
    );
  } else {
    return refreshTokenSubject.pipe(
      filter(token => token != null),
      take(1),
      switchMap(access_token => next(addToken(request, access_token)))
    );
  }
}