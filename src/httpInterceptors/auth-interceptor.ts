import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from 'src/services/authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService, private router: Router) {
    }

    intercept(req: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        debugger;
        const token = this.authenticationService.getToken();

        if (!token || this.authenticationService.isTokenExpired()) {
            console.log('not authorized');
            this.authenticationService.logout();
            this.router.navigate(['/login']);
            return next.handle(req);
        }
        else {
            const cloned = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + token)
            });

            console.log('authorized');
            return next.handle(cloned);
        }
    }
}
