import { inject, Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
} from '@angular/router';
import {OidcSecurityService, UserDataResult} from "angular-auth-oidc-client";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserGuard implements CanActivate {
  private oidcSecurityService : OidcSecurityService = inject(OidcSecurityService)
  private router = inject(Router);

  canActivate(
    route: ActivatedRouteSnapshot,
  ): Observable<boolean> | boolean {
    let role = route.data['role'];
    let roles : string[] = [];
    this.oidcSecurityService.userData$.subscribe((userdata : UserDataResult) => {
      roles = userdata.userData.groups;
    })
   if (!roles.includes(role)) {
      this.router.navigate(['/']);
      return false;
    }
    console.log("role: ", roles.includes(role));
    return roles.includes(role);

    // Checks if logged in and if not redirects to login

  }

  //hvis logget ind som spectator og prøver at få adgang til organizer
  // ---- redirect til siden man kom fra
}

