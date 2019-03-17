import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) {
    }

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.authenticationService.getToken();

        if (token) {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + token)
            });

            console.log('authorized');
            return next.handle(cloned);
        }
        else {
            console.log('not authorized');
            return next.handle(req);
        }
    }
}
